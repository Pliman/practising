var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    foo: './foo.js', bar: './bar.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist1'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ]
};
