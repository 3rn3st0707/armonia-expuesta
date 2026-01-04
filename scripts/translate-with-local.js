const fs = require('fs');
const path = require('path');
const axios = require('axios');
const matter = require('gray-matter');

// Configuration
const LIBRETRANSLATE_API_URL = 'http://127.0.0.1:5050/translate';
const SOURCE_LANG = 'es';
const TARGET_LANG = 'en';
const DELAY_BETWEEN_REQUESTS = 50;
const OUTPUT_DIR = path.join(__dirname, '../../armonia-expuesta-en');
const MAX_CHUNK_SIZE = 1500;

// Directories to scan for markdown files
const CONTENT_DIRS = ['docs', 'blog', 'textos', 'src/pages'];

// Helper function to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Translation Helpers ---

async function translateTextApi(text, isHtml = false, retries = 3) {
    if (!text || text.trim().length === 0) return text;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(LIBRETRANSLATE_API_URL, {
                q: text,
                source: SOURCE_LANG,
                target: TARGET_LANG,
                format: isHtml ? 'html' : 'text'
            }, { headers: { 'Content-Type': 'application/json' } });

            if (response.data && response.data.translatedText) {
                return response.data.translatedText;
            }
        } catch (error) {
            if (attempt === retries) {
                console.error(`Translation error:`, error.message);
                return text;
            }
            await sleep(DELAY_BETWEEN_REQUESTS * attempt);
        }
    }
    return text;
}

// Translate text but preserve HTML tags and Markdown links using HTML-tag placeholders
async function translateTextProtected(rawText) {
    if (!rawText.trim()) return rawText;

    const localPlaceholders = [];

    // We use custom HTML tags that LibreTranslate will recognize as "do not translate"
    // Format: <xtag id="0"></xtag>

    // 1. Protect Markdown Headers (prevent # becoming ♪)
    let safeText = rawText.replace(/^(#+)\s+/gm, (match, hashes) => {
        const id = localPlaceholders.length;
        localPlaceholders.push(match);
        return `<b translate="no">X${id}X</b>`;
    });

    // 2. Protect HTML tags <...> (exclude our own custom tags to avoid recursion)
    safeText = safeText.replace(/<(?!(\/?b\b))[^>]+>/gi, (match) => {
        const id = localPlaceholders.length;
        localPlaceholders.push(match);
        return `<b translate="no">X${id}X</b>`;
    });

    // 3. Protect Musical Chords and Symbols (e.g., F#°, Bb7, Cmaj7, D7/9, F#m, C/B)
    safeText = safeText.replace(/([A-G][#b][°º79m\d\/]*|[A-G]maj7|[A-G]min7|[A-G]dim7|[A-G]°|[A-G]º)/g, (match) => {
        const id = localPlaceholders.length;
        localPlaceholders.push(match);
        return `<b translate="no">X${id}X</b>`;
    });

    // 4. Protect Markdown Links [text](url) -> [text](placeholder)
    safeText = safeText.replace(/\]\(([^)]+)\)/g, (match, url) => {
        const id = localPlaceholders.length;
        localPlaceholders.push(url);
        return `](<b translate="no">U${id}U</b>)`;
    });

    // Translate as HTML
    let translated = await translateTextApi(safeText, true);

    // Restore
    for (let i = 0; i < localPlaceholders.length; i++) {
        const content = localPlaceholders[i];
        // Match <b translate="no">XiX</b> or similar variations
        const restoreRegexX = new RegExp(`<b\\s*[^>]*>\\s*X${i}X\\s*<\\/b>`, 'gi');
        const restoreRegexU = new RegExp(`<b\\s*[^>]*>\\s*U${i}U\\s*<\\/b>`, 'gi');
        translated = translated.replace(restoreRegexX, content);
        translated = translated.replace(restoreRegexU, content);
    }

    // Post-process cleanup for common spacing issues
    // General Markdown Links
    translated = translated.replace(/\]\s+\(/g, '](');

    // Musical Chords: Fix spaces in symbols like F #, Bb, C maj 7, etc.
    translated = translated.replace(/([A-G])\s+#/g, '$1#');
    translated = translated.replace(/([A-G])\s+b/g, '$1b');
    translated = translated.replace(/#\s+°/g, '#°');
    translated = translated.replace(/#\s+º/g, '#°');
    translated = translated.replace(/#\s+(\d+)/g, '#$1');
    translated = translated.replace(/maj\s+(\d+)/gi, 'maj$1');
    translated = translated.replace(/min\s+(\d+)/gi, 'min$1');
    translated = translated.replace(/dim\s+(\d+)/gi, 'dim$1');
    translated = translated.replace(/\b([A-G][#b]?)\s+([mº79])/g, '$1$2'); // e.g. "F# 7" -> "F#7"

    // React Components and Common Tags
    translated = translated.replace(/<\s+FAIcon/g, '<FAIcon');
    translated = translated.replace(/<\s+\/\s*FAIcon/g, '</FAIcon');
    translated = translated.replace(/\/\s+>/g, '/>');
    translated = translated.replace(/icon\s*=\s*/g, 'icon=');
    translated = translated.replace(/className\s*=\s*/g, 'className=');
    translated = translated.replace(/style\s*=\s*/g, 'style=');

    // Fix for LibreTranslate lowercase conversion of component names
    translated = translated.replace(/<faicon/gi, '<FAIcon');
    translated = translated.replace(/<\/faicon/gi, '</FAIcon');

    return translated;
}

async function processProtectedBlockLine(line) {
    // Inside code blocks, we only translate link text.
    const allMatches = [];
    const htmlLinkRegex = /(<a\s+[^>]*>)(.*?)(<\/a>)/gi;
    const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    let match;
    while ((match = htmlLinkRegex.exec(line)) !== null) {
        allMatches.push({ type: 'html', start: match.index, end: match.index + match[0].length, ...match });
    }
    while ((match = mdLinkRegex.exec(line)) !== null) {
        allMatches.push({ type: 'md', start: match.index, end: match.index + match[0].length, ...match });
    }

    allMatches.sort((a, b) => a.start - b.start);

    let newLine = "";
    let lastIndex = 0;

    for (const m of allMatches) {
        newLine += line.substring(lastIndex, m.start);
        if (m.type === 'html') {
            const translatedContent = await translateTextApi(m[2], false); // Plain text translation
            newLine += m[1] + translatedContent + m[3];
        } else {
            const translatedContent = await translateTextApi(m[1], false);
            newLine += `[${translatedContent}](${m[2]})`;
        }
        lastIndex = m.end;
    }
    newLine += line.substring(lastIndex);
    return newLine;
}


// --- Main Logic ---

async function translateMarkdown(content) {
    const lines = content.split('\n');
    const translatedLines = [];

    let inFence = false;
    let inHtmlPre = false;
    let inHtmlCode = false;
    let inFrontmatter = false;
    let lineCount = 0;

    let textBuffer = [];
    let currentBufferSize = 0;

    const flushBuffer = async () => {
        if (textBuffer.length === 0) return;
        const textToTranslate = textBuffer.join('\n');
        const translatedText = await translateTextProtected(textToTranslate);
        translatedLines.push(translatedText);
        textBuffer = [];
        currentBufferSize = 0;
        await sleep(DELAY_BETWEEN_REQUESTS);
    };

    for (const line of lines) {
        lineCount++;
        const trimmed = line.trim();

        const isFenceStart = trimmed.startsWith('```');
        const isPreStart = /<pre/i.test(trimmed);
        const isPreEnd = /<\/pre>/i.test(trimmed);
        const isCodeStart = /<code/i.test(trimmed);
        const isCodeEnd = /<\/code>/i.test(trimmed);
        const isFrontmatterFence = (lineCount <= 2 && trimmed === '---');

        if (isFenceStart || isPreStart || isCodeStart || isFrontmatterFence) {
            await flushBuffer();
        }

        if (isFrontmatterFence) {
            inFrontmatter = !inFrontmatter;
            translatedLines.push(line);
            continue;
        }
        if (inFrontmatter) {
            translatedLines.push(line);
            continue;
        }

        if (isFenceStart) {
            inFence = !inFence;
            translatedLines.push(line);
            continue;
        }

        if (isPreStart) inHtmlPre = true;

        if (inHtmlPre || inHtmlCode || inFence) {
            const processed = await processProtectedBlockLine(line);
            translatedLines.push(processed);
            if (isPreEnd) inHtmlPre = false;
            if (isCodeEnd) inHtmlCode = false;
            continue;
        }

        if (isCodeStart) {
            inHtmlCode = true;
            const processed = await processProtectedBlockLine(line);
            translatedLines.push(processed);
            if (isCodeEnd) inHtmlCode = false;
            continue;
        }

        if (trimmed.length === 0) {
            await flushBuffer();
            translatedLines.push(line);
            continue;
        }

        // Heuristic: skip lines that are purely HTML tags (except links) or table rows
        if ((trimmed.match(/^<[^>]+>$/) && !trimmed.startsWith('<a')) || trimmed.match(/^\|.*\|$/)) {
            await flushBuffer();
            translatedLines.push(line);
            continue;
        }

        if (/[a-zA-Z]/.test(line)) {
            textBuffer.push(line);
            currentBufferSize += line.length;
            if (currentBufferSize >= MAX_CHUNK_SIZE) {
                await flushBuffer();
            }
        } else {
            await flushBuffer();
            translatedLines.push(line);
        }

        if (lineCount % 100 === 0) process.stdout.write('.');
    }

    await flushBuffer();
    return translatedLines.join('\n');
}

async function processMarkdownFile(filePath, outputPath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);

        const translatedContent = await translateMarkdown(content);
        const output = matter.stringify(translatedContent, frontmatter);

        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, output, 'utf8');
        console.log(`\n✓ Translated: ${outputPath}`);
    } catch (error) {
        console.error(`\n✗ Error processing ${filePath}:`, error.message);
    }
}

function findMarkdownFiles(dir, baseDir) {
    const results = [];
    if (!fs.existsSync(dir)) return results;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            results.push(...findMarkdownFiles(filePath, baseDir));
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            results.push({ source: filePath, relative: path.relative(baseDir, filePath) });
        }
    }
    return results;
}

async function main() {
    console.log('🌍 Local LibreTranslate Script (HTML-Tag Protection Mode)');
    console.log('====================================================\n');

    try {
        await axios.get('http://127.0.0.1:5050/languages');
        console.log('✅ LibreTranslate API is accessible');
    } catch (error) {
        console.error('❌ Could not connect to LibreTranslate at http://127.0.0.1:5050');
        process.exit(1);
    }

    const allFiles = [];
    const projectRoot = path.join(__dirname, '..');
    for (const dir of CONTENT_DIRS) {
        allFiles.push(...findMarkdownFiles(path.join(projectRoot, dir), projectRoot));
    }

    console.log(`Found ${allFiles.length} markdown files\n`);

    for (let i = 0; i < allFiles.length; i++) {
        const { source, relative } = allFiles[i];
        const outputPath = path.join(OUTPUT_DIR, relative);
        console.log(`\n[${i + 1}/${allFiles.length}] ${relative} ...`);
        await processMarkdownFile(source, outputPath);
    }

    console.log('\n\n✅ Translation complete!');
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
