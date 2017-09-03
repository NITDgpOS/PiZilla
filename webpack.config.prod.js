const config = require('./webpack.config');
const webpack = require('webpack');

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        minimize: true
    })
];
delete config.devServer;
delete config.devtool;

module.exports = config;
