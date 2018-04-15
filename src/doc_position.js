function setDocCursor(elementIndex) {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const element = findElementAtOffset(body, elementIndex);
    if (element != null) {
        const position = doc.newPosition(element, 0);
        doc.setCursor(position);        
    } else {
        alert('Unable to set cursor.');
    }
}

function findElementAtOffset(body, elementIndex) {
    var i = 0;
    var docTextSoFar = '';
    var prevLength = 0;
    var nextCheckInLength = 100;
    const paragraphs = body.getParagraphs();
    while (i < paragraphs.length) {
        var childText = paragraphs[i].getText();
        docTextSoFar += '\n' + childText;
        if (docTextSoFar.length > prevLength + nextCheckInLength) {
            prevLength = docTextSoFar.length;
            var currentOffset = getCurrentOffset(docTextSoFar);
            if (currentOffset >= elementIndex + 1) {
                return paragraphs[i - 1];
            }

            nextCheckInLength = calculateNextCheckIn(currentOffset, elementIndex, docTextSoFar.length);
        }
        i += 1;
    }
    var currentOffset = getCurrentOffset(docTextSoFar);
    if (currentOffset >= elementIndex + 1) {
        return paragraphs[paragraphs.length - 1];
    }

    return null;
}

function calculateNextCheckIn(currentOffset, desiredOffset, docLengthSoFar) {
    const avgNodeLength = docLengthSoFar / currentOffset;
    return Math.floor(Math.max(desiredOffset - currentOffset, 0) * Math.min(avgNodeLength, 100));
}


function getCurrentOffset(docTextSoFar) {
    try {
        var markdownHtml = convertToMarkdownHtml(docTextSoFar);
        return countDirectNodes(markdownHtml);
    } catch (e) {
        return -1;
    }
}

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