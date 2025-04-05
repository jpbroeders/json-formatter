const rawJson = document.getElementById('rawJson');
const prettyJson = document.getElementById('prettyJson');
const clearButton = document.getElementById('clearButton');
const copyButton = document.getElementById('copyButton');

// Update formatted JSON on input
rawJson.addEventListener('input', function () {
    try {
        const jsonObj = JSON.parse(rawJson.value);
        prettyJson.textContent = JSON.stringify(jsonObj, null, 2);
    } catch (e) {
        prettyJson.textContent = 'Invalid JSON: ' + e.message;
    }
});

// Clear both text areas
clearButton.addEventListener('click', function () {
    rawJson.value = '';
    prettyJson.textContent = '';
});

// Copy formatted JSON to clipboard
copyButton.addEventListener('click', function () {
    const textToCopy = prettyJson.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Formatted JSON copied to clipboard!'))
        .catch((err) => alert('Failed to copy text: ' + err));
});
