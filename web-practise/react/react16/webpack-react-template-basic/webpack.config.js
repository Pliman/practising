'use strict'

const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        'app': ['./app']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                use: {loader: 'file-loader?name=[path][name].[ext]'}
            },
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],

    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    optimization: {
        splitChunks: {
            name: 'vendors'
        }
    }

}

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
