const fs = require('fs');
const path = require('path');
const axios = require('axios');
const matter = require('gray-matter');

// Configuration
const LECTO_API_URL = 'https://api.lecto.ai/v1/translate/text';
const LECTO_API_KEY = 'GGSRZT1-95S4DG6-NYRNYA9-N7WGEF1';
const SOURCE_LANG = 'es';
const TARGET_LANG = 'en';
const DELAY_BETWEEN_REQUESTS = 1000; // 1 second delay
const OUTPUT_DIR = path.join(__dirname, '..', 'translated-content');

// Directories to scan for markdown files
const CONTENT_DIRS = ['docs', 'blog', 'textos', 'src/pages'];

// Helper function to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to check if a line is a code block delimiter
const isCodeBlockDelimiter = (line) => {
    return line.trim().startsWith('```');
};

// Helper function to translate text using Lecto AI API
async function translateText(text, retries = 3) {
    if (!text || text.trim().length === 0) {
        return text;
    }

    // Lecto handles larger chunks better, but let's keep it safe
    const MAX_CHARS = 2000;

    // If text is short enough, translate directly
    if (text.length <= MAX_CHARS) {
        return await translateChunk(text, retries);
    }

    // Split long text into sentences and translate in chunks
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const translatedParts = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= MAX_CHARS) {
            currentChunk += sentence;
        } else {
            if (currentChunk) {
                const translated = await translateChunk(currentChunk, retries);
                translatedParts.push(translated);
                await sleep(DELAY_BETWEEN_REQUESTS);
            }
            currentChunk = sentence;
        }
    }

    // Translate remaining chunk
    if (currentChunk) {
        const translated = await translateChunk(currentChunk, retries);
        translatedParts.push(translated);
    }

    return translatedParts.join(' ');
}

// Helper function to translate a single chunk
async function translateChunk(text, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(LECTO_API_URL, {
                texts: [text],
                to: [TARGET_LANG],
                from: SOURCE_LANG
            }, {
                headers: {
                    'X-API-Key': LECTO_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = response.data;

            if (data.translations && data.translations.length > 0) {
                return data.translations[0].translated[0];
            } else {
                console.warn(`Translation warning: ${JSON.stringify(data)}`);
                if (attempt === retries) {
                    return text; // Return original text if all retries fail
                }
            }
        } catch (error) {
            const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
            console.error(`Translation error (attempt ${attempt}/${retries}):`, errorMessage);

            if (attempt === retries) {
                return text; // Return original text if all retries fail
            }
            await sleep(DELAY_BETWEEN_REQUESTS * attempt); // Exponential backoff
        }
    }

    return text;
}

// Helper function to translate markdown content while preserving structure
async function translateMarkdown(content) {
    const lines = content.split('\n');
    const translatedLines = [];
    let inCodeBlock = false;
    let inFrontmatter = false;
    let lineCount = 0;

    for (const line of lines) {
        lineCount++;

        // Check for frontmatter delimiters (---)
        if (lineCount <= 2 && line.trim() === '---') {
            inFrontmatter = !inFrontmatter;
            translatedLines.push(line);
            continue;
        }

        // Skip frontmatter content
        if (inFrontmatter) {
            translatedLines.push(line);
            continue;
        }

        // Check for code block delimiters
        if (isCodeBlockDelimiter(line)) {
            inCodeBlock = !inCodeBlock;
            translatedLines.push(line);
            continue;
        }

        // Skip code block content
        if (inCodeBlock) {
            translatedLines.push(line);
            continue;
        }

        // Skip empty lines
        if (line.trim().length === 0) {
            translatedLines.push(line);
            continue;
        }

        // Skip lines that are mostly HTML tags or special markdown syntax
        if (line.trim().match(/^<[^>]+>$/) || line.trim().match(/^[\-\*\+]\s*$/) || line.trim().match(/^\|.*\|$/)) {
            translatedLines.push(line);
            continue;
        }

        // Translate the line
        try {
            // Only translate if line contains letters
            if (/[a-zA-Z]/.test(line)) {
                const translated = await translateText(line);
                translatedLines.push(translated);
                await sleep(DELAY_BETWEEN_REQUESTS); // Rate limiting
            } else {
                translatedLines.push(line);
            }

            // Progress indicator
            if (lineCount % 10 === 0) {
                process.stdout.write('.');
            }
        } catch (error) {
            console.error(`Error translating line ${lineCount}:`, error.message);
            translatedLines.push(line); // Keep original on error
        }
    }

    return translatedLines.join('\n');
}

// Helper function to process a single markdown file
async function processMarkdownFile(filePath, outputPath) {
    console.log(`\nProcessing: ${filePath}`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);

        // Translate the content (excluding frontmatter)
        const translatedContent = await translateMarkdown(content);

        // Reconstruct the file with original frontmatter and translated content
        const output = matter.stringify(translatedContent, frontmatter);

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write translated file
        fs.writeFileSync(outputPath, output, 'utf8');
        console.log(`\n✓ Translated: ${outputPath}`);
    } catch (error) {
        console.error(`\n✗ Error processing ${filePath}:`, error.message);
    }
}

// Helper function to recursively find all markdown files
function findMarkdownFiles(dir, baseDir) {
    const results = [];

    if (!fs.existsSync(dir)) {
        return results;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results.push(...findMarkdownFiles(filePath, baseDir));
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const relativePath = path.relative(baseDir, filePath);
            results.push({ source: filePath, relative: relativePath });
        }
    }

    return results;
}

// Main function
async function main() {
    console.log('🌍 Lecto AI Translation Script');
    console.log('================================\n');
    console.log(`Source Language: ${SOURCE_LANG}`);
    console.log(`Target Language: ${TARGET_LANG}`);
    console.log(`Output Directory: ${OUTPUT_DIR}\n`);

    // Clean output directory
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.rmSync(OUTPUT_DIR, { recursive: true });
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // Find all markdown files
    const allFiles = [];
    const projectRoot = path.join(__dirname, '..');

    for (const dir of CONTENT_DIRS) {
        const fullPath = path.join(projectRoot, dir);
        const files = findMarkdownFiles(fullPath, projectRoot);
        allFiles.push(...files);
    }

    console.log(`Found ${allFiles.length} markdown files to translate\n`);

    if (allFiles.length === 0) {
        console.log('No markdown files found. Exiting.');
        return;
    }

    // Process each file
    for (let i = 0; i < allFiles.length; i++) {
        const { source, relative } = allFiles[i];
        const outputPath = path.join(OUTPUT_DIR, relative);

        console.log(`\n[${i + 1}/${allFiles.length}]`);
        await processMarkdownFile(source, outputPath);
    }

    console.log('\n\n✅ Translation complete!');
    console.log(`Translated files saved to: ${OUTPUT_DIR}`);
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
