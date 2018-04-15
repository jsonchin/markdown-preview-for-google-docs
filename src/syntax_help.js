function renderSyntaxHelper() {
    return HtmlService.createTemplateFromFile('src/templates/syntax_help.html')
        .evaluate()
        .setWidth(700)
        .setHeight(500)
}
