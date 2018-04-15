function renderSidebar() {
  var template = HtmlService.createTemplateFromFile('src/templates/sidebar.html');
  var htmlOutput = template.evaluate();
  htmlOutput.setTitle('Rendered Markdown');
  return htmlOutput;
}

function convertDocToMarkdown() {
  var docText = getDocumentText();
  var markdownHtml = getConverter().makeHtml(docText);
  return markdownHtml;
}

function getDocumentText() {
  return DocumentApp.getActiveDocument().getBody().getText();
}

function getConverter() {
  return new showdown.Converter();
}
