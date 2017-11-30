// dependencies
var fs = require("fs")
var postcss = require("postcss")
var extend = require("postcss-define-function")

// css to be processed
var css = fs.readFileSync("define-function.pcss", "utf8")

// process css
postcss()
    .use(extend())
    .process(css, {
        // `from` option is needed here
        from: "define-function.pcss"
    })
    .then(function (result) {
        var output = result.css

        console.log(output)
    })
