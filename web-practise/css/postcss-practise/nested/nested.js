// dependencies
var fs = require("fs")
var postcss = require("postcss")
var extend = require("postcss-nested")

// css to be processed
var css = fs.readFileSync("nested.pcss", "utf8")

// process css
postcss()
    .use(extend())
    .process(css, {
        // `from` option is needed here
        from: "nested.pcss"
    })
    .then(function (result) {
        var output = result.css

        console.log(output)
    })
