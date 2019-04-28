const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
};
