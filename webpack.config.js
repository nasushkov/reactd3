const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin')
const merge = require('webpack-merge');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve('./');
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
process.env.BABEL_ENV = TARGET;


const common = {
    entry: ['babel-polyfill', APP_PATH],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.css$/,
                loaders: ['postcss'],
                include: APP_PATH
            },
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: APP_PATH
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: APP_PATH,
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.png|jpg|jpeg|gif|svg?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'React d3'
        }),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        })
    ]
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: 8081
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: APP_PATH
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    });
}

if(TARGET === 'build' || TARGET === 'stats') {
    module.exports = merge(common, {
        entry: {
            app: APP_PATH
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].[chunkhash].js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: APP_PATH
                }
            ]
        },
        plugins: [
            new Clean([BUILD_PATH]),
            new ExtractTextPlugin('styles.[chunkhash].css'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}