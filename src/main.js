function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem("Render", "showSidebar")
      .addItem("Markdown syntax", "showSyntaxHelper")
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar(e) {
  DocumentApp.getUi().showSidebar(renderSidebar());
}

function showSyntaxHelper(e) {
  DocumentApp.getUi().showModalDialog(renderSyntaxHelper(), 'Markdown Syntax Helper');
}
