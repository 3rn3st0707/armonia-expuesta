Sure! Below is a simple HTML, CSS, and JavaScript example of an app that highlights given substrings in different corresponding colors within a text input.

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Highlight Substrings</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <textarea id="textInput" placeholder="Type your text here..."></textarea>
        <div id="highlightedText"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS
```css
/* styles.css */
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}

.container {
    width: 80%;
    max-width: 600px;
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
}

#highlightedText {
    white-space: pre-wrap;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    min-height: 100px;
}
```

### JavaScript
```javascript
// script.js
document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const highlightedText = document.getElementById("highlightedText");

    // Define the substrings to highlight and their corresponding colors
    const substrings = {
        "JavaScript": "yellow",
        "HTML": "lightgreen",
        "CSS": "lightblue"
    };

    textInput.addEventListener("input", () => {
        const inputText = textInput.value;
        highlightedText.innerHTML = highlightSubstrings(inputText, substrings);
    });

    function highlightSubstrings(text, substrings) {
        let highlighted = text;
        for (const [substring, color] of Object.entries(substrings)) {
            const regex = new RegExp(`(${substring})`, 'gi');
            highlighted = highlighted.replace(regex, `<span style="background-color: ${color};">$1</span>`);
        }
        return highlighted;
    }
});
```

### Explanation
- **HTML:** The HTML file includes a `textarea` for user input and a `div` to display the highlighted text.
- **CSS:** The CSS file styles the `textarea` and the `div` to make the app look clean and readable.
- **JavaScript:** The JavaScript file listens for input on the `textarea`, processes the text to highlight specified substrings with different colors, and displays the highlighted text in the `div`.

This basic example will highlight the words "JavaScript", "HTML", and "CSS" in yellow, light green, and light blue, respectively, whenever they appear in the user input. You can easily extend this by adding more substrings and colors to the `substrings` object in the JavaScript code.