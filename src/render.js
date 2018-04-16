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
    showdown.extension('prettify', function () {
        return [{
            type: 'output',
            filter: function (source) {
                return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
                    if (pre) {
                        return '<pre class="prettyprint linenums"><code' + codeClass + '>';
                    } else {
                        return ' <code class="prettyprint">';
                    }
                });
            }
        }];
    });
    converter = new showdown.Converter({extensions: ['prettify']});
    converter.setFlavor('github');
  }
  return converter;
}
