import clientConfig from './webpack.config.babel';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

clientConfig.name = 'frontend build';
clientConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        minimize: true
    })
];
delete clientConfig.devServer;
delete clientConfig.devtool;


const nodeModules = {};
fs.readdirSync('node_modules')
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => nodeModules[mod] = `commonjs ${mod}`);

const serverConfig = { ...clientConfig };
serverConfig.name = 'backend build';
serverConfig.entry = path.resolve(__dirname, './server/index.js');
serverConfig.target = 'node';
serverConfig.externals = nodeModules;
serverConfig.output = {
    filename: 'bundle.server.js',
    path: path.resolve(__dirname, 'build/server')
};


export default [clientConfig, serverConfig];
