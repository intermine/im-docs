/*
The code below replaces the official Sphinx CopyButton, with a few enhanced elements.
No longer are $ elements copied to the clipboard.
Also everything before the $ is not copied to the clipboard.
 */

function getPlainTextToCopyData(innerNodes) {
    let result = "";

    // We remove the child elements and only copy (care) about the data inside them.
    for (let i = 0; i < innerNodes.length; i++) {

        if (innerNodes[i].nodeValue === null) {  // Whenever a child element has other child elements, whe do the same thing and only care about the text data
            for (let j = 0; j < innerNodes[i].childNodes.length; j++) {
                result += innerNodes[i].childNodes[j].nodeValue;
            }
        } else {
            result += innerNodes[i].nodeValue;
        }
    }

    return result;
}

function removeDollarSigns(dataLines) {
    /*
    This function removes the $ and everything before it, but only for the first $ sign.
    All other $ are replaced by an empty string.
    If there are any trailing whitespaces, we remove them by trim().
    dataLines contains an array of lines for each line that should be copied.
     */
    let result = "";

    for (let i = 0; i < dataLines.length; i++) {
        // Sometimes the last element of the dataLines is a blank string, if this is the case
        // then just add a new line to the string. This counters the 'undefined' value that is copied
        if (dataLines[i].includes("$ ") && (i + 1 !== dataLines.length || dataLines[i] !== "")) {  // Only process the string if it contains the $ sign
            let tempResult = dataLines[i].split(/^.*?\$/)[1];  // Removes the first $ and everything before it
            tempResult = tempResult.replace(/\$ /g, " ");  // Replaces all other $ chars with a blank space
            tempResult = tempResult.trim();  // Remove all trailing whitespaces
            result += tempResult + "\n";  // Append the data to the result with a new line
        } else if (!dataLines[i].includes("$ ") && (i + 1 !== dataLines.length || dataLines[i] !== "")) {
            result += dataLines[i] + "\n";  // Do nothing with the data, because it does not contain a $ sign
        } else {
            result += "\n";
        }
    }

    return result;
}

function hasDollarSign(dataLines) {
    /*
    This function checks if any of the lines contain a dollar sigh and returns True if they do
     */
    for (let i = 0; i < dataLines.length; i++) {
        if (dataLines[i].includes("$ ")) {
            return true;
        }
    }
    return false;
}

function getComputedData(button) {
    /*
    This function is called when a user presses the copy button on the site.
    It get's the data that should be copied and processes it via other functions
     */
    let toCopyDataId = button.getAttribute('data-clipboard-target').substr(1);  // Get id from to copy data
    let toCopyData = document.getElementById(toCopyDataId);  // Get the to copy data

    // Some to copy data elements have <span class...>...</span> child elements, this makes an array of all those elements
    let innerNodes = toCopyData.childNodes;

    let plainTextToCopyData = getPlainTextToCopyData(innerNodes);
    let plainTextToCopyDataPerLine = plainTextToCopyData.split("\n");  // We split the plaintext data into an array of linebreaks

    if (hasDollarSign(plainTextToCopyDataPerLine)) {
        return removeDollarSigns(plainTextToCopyDataPerLine);
    } else {
        return plainTextToCopyData;  // Return the data without a split on new lines
    }
}

$(function() {
    clipboard = new ClipboardJS('.copybtn', {
        text: function(e) {
            return getComputedData(e);
        }
    });

    // Default from copybutton.js
    clipboard.on('success', event => {
        clearSelection();
        temporarilyChangeTooltip(event.trigger, messages[locale]['copy_success'])
    });

    clipboard.on('error', event => {
        temporarilyChangeTooltip(event.trigger, messages[locale]['copy_failure'])
    });
});
