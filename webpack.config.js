const path = require('path');
const Webpack = require('webpack');

const config = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'app', 'main.tsx')
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(t|j)sx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    instance: 'frontend',
                    configFileName: 'tsconfig.react.json'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 80000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
    }
};

module.exports = config;
