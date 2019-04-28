var path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  module: {
    rules: [
      {
        test: /\.txt$/,
        "use": [
          {"loader": "css-loader"},
          {
            "loader": "postcss-loader",
            "options": {"config": {"path": "/data/practising/web-practise/css/postcss-practise/postcss-sass"}}
          },
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  "plugins": [
    {
      "profile": false,
      "modulesCount": 500,
      "showEntries": false,
      "showModules": true,
      "showActiveModules": true,
      "options": {
        "name": "webpack",
        "color": "#5C95EE",
        "reporters": ["fancy"],
        "reporter": null
      },
      "reporters": [{}]
    }, {
      "options": {
        "template": "./public/index.html",
        "templateParameters": {"jsLibs": []},
        "filename": "index.html",
        "hash": false,
        "inject": "body",
        "compile": true,
        "favicon": false,
        "minify": false,
        "cache": true,
        "showErrors": true,
        "chunks": "all",
        "excludeChunks": [],
        "meta": {},
        "title": "Webpack App",
        "xhtml": false
      }
    }
  ],
  "resolve": {
    "extensions": [".js", ".ts", ".jsx", ".tsx", ".json"],
    "alias": {
      "_": "/data/practising/web-practise/css/postcss-practise/postcss-sass",
      "&": "/data/practising/web-practise/css/postcss-practise/postcss-sass/src"
    },
    "plugins": [{
      "appSrc": "/data/practising/web-practise/css/postcss-practise/postcss-sass",
      "allowedFiles": {}
    }]
  },
  "devServer": {
    "port": 3000,
    "host": "127.0.0.1",
    "hot": true,
    "contentBase": "/data/practising/web-practise/css/postcss-practise/postcss-sass/dist",
    "publicPath": "/",
    "headers": {"Access-Control-Allow-Origin": "*"},
    "quiet": true
  },
  "target": "web",
  "node": {
    "setImmediate": false,
    "dgram": "empty",
    "fs": "empty",
    "net": "empty",
    "tls": "empty",
    "child_process": "empty"
  },
  "devtool": "cheap-source-map"
};
