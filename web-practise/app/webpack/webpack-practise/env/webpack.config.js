var webpack = require('webpack');

module.exports = {
  entry: "./foo.js",
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'development',
      __dev__: true
    })
  ]
};

if (process.env.NODE_ENV === 'development') {
  console.log('development');
}

if (__dev__) {
  console.log('dev');
}

console.log('aaaa');
