function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem("Render", "showSidebar")
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar(e) {
  DocumentApp.getUi().showSidebar(renderSidebar());
}
