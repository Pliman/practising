var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
	entry: {
		main: "./example"
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].chunkhash.js",
		chunkFilename: "[chunkhash].js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{test: /\.png$/, loader: "file-loader"}
		]
	},
	plugins: [
		new ExtractTextPlugin("styleA.css") // 打包的是style.css 其他的作为chunk，因为example.js里面使用了require(["./chunk"]);，如果改成require("./chunk");就打到同一个文件
	]
};