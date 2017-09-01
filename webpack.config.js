var path = require('path');
var Webpack = require('webpack');

var config = {
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        'extensions': ['.js', '.jsx', '.json']
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval',
    devServer: {
        hot: true,
        inline: true
    }
};

module.exports = config;
