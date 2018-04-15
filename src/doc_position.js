/**
 * Sets the Document cursor to the specified rendered HTML node index.
 * 
 * elementIndex is the index of the node that was clicked in the sidebar.
 */
function setDocCursor(elementIndex) {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const element = findElementAtIndex(body, elementIndex);
    if (element != null) {
        const position = doc.newPosition(element, 0);
        doc.setCursor(position);        
    } else {
        alert('Unable to set cursor.');
    }
}

/**
 * Finds the element in the Google Doc at the specified rendered
 * markdown node index.
 */
function findElementAtIndex(body, elementIndex) {
    var i = 0;
    var docTextSoFar = '';
    var nextCheckInLength = 100;
    const paragraphs = body.getParagraphs();
    while (i < paragraphs.length) {
        var childText = paragraphs[i].getText();
        docTextSoFar += '\n' + childText;
        if (docTextSoFar.length > nextCheckInLength) {
            var currentOffset = getCurrentElementIndex(docTextSoFar);
            if (currentOffset >= elementIndex + 1) {
                return paragraphs[i - 1];
            }

            nextCheckInLength = calculateNextCheckIn(currentOffset, elementIndex, docTextSoFar.length);
        }
        i += 1;
    }
    var currentOffset = getCurrentElementIndex(docTextSoFar);
    if (currentOffset >= elementIndex + 1) {
        return paragraphs[paragraphs.length - 1];
    }

    return null;
}

/**
 * Calculates the number of characters that must be read until
 * the next markdown rendering and check in to see if the index
 * has been reached.
 */
function calculateNextCheckIn(currentOffset, desiredOffset, docLengthSoFar) {
    const avgNodeLength = docLengthSoFar / currentOffset;
    return docLengthSoFar + Math.floor(Math.max(desiredOffset - currentOffset, 0) * Math.min(avgNodeLength, 100));
}

/**
 * Calculates the current index in the rendered markdown using the
 * partial document text given.
 * 
 * This is an expensive call and should be used sparingly.
 */
function getCurrentElementIndex(docTextSoFar) {
    try {
        var markdownHtml = convertToMarkdownHtml(docTextSoFar);
        return countDirectNodes(markdownHtml);
    } catch (e) {
        return -1;
    }
}

/**
 * Calculates the number of direct (top-level) nodes in htmlStr.
 */
function countDirectNodes(htmlStr) {
    var count = 0;
    var stack = 0;
    var i = 0;
    var length = htmlStr.length;
    while (i < length) {
        var c = htmlStr[i];
        if (c == '<') {
            if (i + 1 < length && htmlStr[i + 1] == '/') {
                stack -= 1;
                if (stack == 0) {
                    count += 1;
                }
            } else {
                stack += 1;
            }
        }
        i += 1;
    }
    return count;
}
