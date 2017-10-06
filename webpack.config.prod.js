const reactConfig = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

reactConfig.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
    })
];
reactConfig.entry = path.resolve(__dirname, 'app', 'main.tsx');
delete reactConfig.devtool;

const config = [reactConfig, {
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    instance: 'backend',
                    configFileName: 'tsconfig.json'
                }
            }
        ]
    },
    entry: path.resolve(__dirname, 'server', 'index.ts'),
    output: {
        filename: 'bundle.server.js',
        path: path.resolve(__dirname, 'public')
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    externals: nodeModules
}]

module.exports = config;
