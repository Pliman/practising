// dependencies
var fs = require("fs")
var postcss = require("postcss")
var extend = require("postcss-mixins")

// css to be processed
var css = fs.readFileSync("mixins.pcss", "utf8")

// process css
postcss()
    .use(extend())
    .process(css, {
        // `from` option is needed here
        from: "mixins.pcss"
    })
    .then(function (result) {
        var output = result.css

        console.log(output)
    })
