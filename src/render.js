var SIDEBAR_NAME = 'Rendered Markdown Preview';
var converter = null;

function renderSidebar() {
  const template = HtmlService.createTemplateFromFile('src/templates/sidebar.html');
  const htmlOutput = template.evaluate();
  htmlOutput.setTitle(SIDEBAR_NAME);
  return htmlOutput;
}

function convertDocToMarkdown() {
  const docText = getDocumentText();
  return convertToMarkdownHtml(docText);
}

function getDocumentText() {
  return DocumentApp.getActiveDocument().getBody().getText();
}

function convertToMarkdownHtml(markdown) {
  const markdownHtml = getConverter().makeHtml(markdown);
  return markdownHtml;
}

function getConverter() {
  if (converter == null) {
    converter = new showdown.Converter();
  }
  return converter;
}
