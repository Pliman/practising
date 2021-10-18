var HTML = require('html-parse-stringify')

// this html:
var html = '<div class="oh"><p>hi</p></div>'

// becomes this AST:
var ast = HTML.parse(html)

console.log(ast)
