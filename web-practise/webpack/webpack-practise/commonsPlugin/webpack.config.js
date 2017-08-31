var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./foo.js', './bar.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
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
