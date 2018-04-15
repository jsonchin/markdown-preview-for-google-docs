var SIDEBAR_NAME = 'Rendered Markdown Preview';

function renderSidebar() {
  var template = HtmlService.createTemplateFromFile('src/templates/sidebar.html');
  var htmlOutput = template.evaluate();
  htmlOutput.setTitle(SIDEBAR_NAME);
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
