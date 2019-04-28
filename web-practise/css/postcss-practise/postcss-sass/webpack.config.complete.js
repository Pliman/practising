module.exports = {
  "mode": "development",
  "context": "/data/beisen/ux-m-italent-appstore",
  "entry": ["./src/global.tsx", "./src/global.less", "./src/app.tsx"],
  "output": {
    "path": "/data/beisen/ux-m-italent-appstore/dist",
    "publicPath": "",
    "pathinfo": true,
    "filename": "[name].chunk.js",
    "chunkFilename": "[name].chunk.js"
  },
  "optimization": {
    "runtimeChunk": {"name": "webpack-bootstrap"},
    "splitChunks": {
      "minSize": 3000,
      "minChunks": 2,
      "maxAsyncRequests": 5,
      "maxInitialRequests": 5,
      "automaticNameDelimiter": "-",
      "name": true,
      "cacheGroups": {
        "vendors": {
          "chunks": "initial",
          "name": "vendors",
          "minChunks": 1,
          "test": {},
          "priority": 10
        },
        "default": false,
        "common": {"name": "common", "minChunks": 2, "priority": 1}
      }
    },
    "minimizer": [{
      "options": {
        "test": {},
        "extractComments": false,
        "sourceMap": true,
        "cache": false,
        "parallel": true,
        "uglifyOptions": {
          "output": {"comments": {}},
          "ecma": 5,
          "compress": {"drop_console": true}
        }
      }
    }, {
      "pluginDescriptor": {"name": "OptimizeCssAssetsWebpackPlugin"},
      "options": {
        "assetProcessors": [{
          "phase": "compilation.optimize-chunk-assets",
          "regExp": {}
        }],
        "assetNameRegExp": {},
        "cssProcessorOptions": {},
        "cssProcessorPluginOptions": {}
      },
      "phaseAssetProcessors": {
        "compilation.optimize-chunk-assets": [{
          "phase": "compilation.optimize-chunk-assets",
          "regExp": {}
        }], "compilation.optimize-assets": [], "emit": []
      },
      "deleteAssetsMap": {}
    }]
  },
  "module": {
    "strictExportPresence": true,
    "rules": [{
      "test": {},
      "use": [{
        "loader": "cache-loader",
        "options": {
          "cacheIdentifier": "js-cache-loader-4.1.2-beta.10",
          "cacheDirectory": "/data/beisen/ux-m-italent-appstore/node_modules/.cache/cache-loader"
        }
      }, {
        "loader": "babel-loader",
        "options": {
          "cacheDirectory": true,
          "babelrc": false,
          "presets": [["@babel/preset-env", {
            "targets": {
              "chrome": "45",
              "edge": "14",
              "ie": "10"
            },
            "modules": false,
            "include": [],
            "useBuiltIns": "usage",
            "debug": true,
            "corejs": 2,
            "loose": true
          }], ["@babel/preset-react", {"development": true}], ["@babel/preset-typescript"]],
          "plugins": [["babel-plugin-styled-components", {
            "ssr": false,
            "displayName": true,
            "fileName": true,
            "pure": false
          }], "@babel/plugin-syntax-dynamic-import", ["@babel/plugin-proposal-decorators", {"legacy": true}], ["@babel/plugin-proposal-class-properties", {"loose": true}], "@babel/plugin-proposal-export-default-from", "@babel/plugin-transform-runtime"]
        }
      }],
      "exclude": {}
    }, {
      "test": {},
      "loader": "file-loader",
      "options": {"name": "images/[name].[ext]"}
    }, {
      "test": {},
      "use": [{
        "loader": "/data/beisen/ux-m-italent-appstore/node_modules/mini-css-extract-plugin/dist/loader.js",
        "options": {"publicPath": "../"}
      }, {"loader": "css-loader"}, {
        "loader": "postcss-loader",
        "options": {"config": {"path": "/data/beisen/ux-m-italent-appstore"}}
      }]
    }, {
      "test": {},
      "use": [{
        "loader": "/data/beisen/ux-m-italent-appstore/node_modules/mini-css-extract-plugin/dist/loader.js",
        "options": {"publicPath": "../"}
      }, {"loader": "css-loader"}, {
        "loader": "postcss-loader",
        "options": {"config": {"path": "/data/beisen/ux-m-italent-appstore"}}
      }, "sass-loader"]
    }, {
      "test": {},
      "use": [{
        "loader": "/data/beisen/ux-m-italent-appstore/node_modules/mini-css-extract-plugin/dist/loader.js",
        "options": {"publicPath": "../"}
      }, {"loader": "css-loader"}, {
        "loader": "postcss-loader",
        "options": {"config": {"path": "/data/beisen/ux-m-italent-appstore"}}
      }, {
        "loader": "less-loader",
        "options": {"javascriptEnabled": true}
      }]
    }]
  },
  "plugins": [{
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
    "paths": ["dist"],
    "options": {
      "root": "/data/beisen/ux-m-italent-appstore",
      "verbose": true,
      "allowExternal": false,
      "dry": false
    }
  }, {"definitions": {"process.env.NODE_ENV": "\"development\""}}, {
    "options": {},
    "fullBuildTimeout": 200,
    "requestTimeout": 10000
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
  }, {
    "compilationSuccessInfo": {
      "messages": ["成功启动本地开发服务器", "地址：http://127.0.0.1:3001"],
      "notes": ["运行环境：development", "根目录：'/data/beisen/ux-m-italent-appstore'", "图表分析：未启用", "publicPath：''"]
    },
    "shouldClearConsole": true,
    "formatters": [null, null, null],
    "transformers": [null, null, null]
  }, {
    "options": {
      "filename": "css/[name].css",
      "chunkFilename": "css/[name].css"
    }
  }],
  "resolve": {
    "extensions": [".js", ".ts", ".jsx", ".tsx", ".json"],
    "alias": {
      "_": "/data/beisen/ux-m-italent-appstore",
      "&": "/data/beisen/ux-m-italent-appstore/src",
      "moment": "dayjs"
    },
    "plugins": [{
      "appSrc": "/data/beisen/ux-m-italent-appstore",
      "allowedFiles": {}
    }]
  },
  "externals": {
    "react": "React",
    "react-dom": "ReactDOM",
    "styled-components": "styled"
  },
  "devServer": {
    "port": 3001,
    "host": "127.0.0.1",
    "hot": true,
    "contentBase": "/data/beisen/ux-m-italent-appstore/dist",
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
