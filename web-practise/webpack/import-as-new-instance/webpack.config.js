var path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            a: '.',
            b: '.'
        }
    },
    mode: 'development'
}
