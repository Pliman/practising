var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./modules/main.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
		// 如果是根目录，就可以省略 publicPath: '/'
	},
	plugins: [
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'react-hot!babel'},
			//{ test: /\.js$/, loader: 'babel-loader' },
			{test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, // use ! to chain loaders
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
		]
	}
};
