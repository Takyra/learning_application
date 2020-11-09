const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin           = require('copy-webpack-plugin');
const HtmlPlugin           = require('html-webpack-plugin');

const PATHS = {
    src    : path.join(__dirname, '../src'),
    dist   : path.join(__dirname, '../client'),
    assets : 'static'
}

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        bundle: PATHS.src
    },

    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },

    watchOptions: {
        aggregateTimeout : 100
    },

    resolve: {
        modules    : ['node_modules'],
        extensions : ['.js']
    },

    resolveLoader: {
        modules    : ['node_modules'],
        extensions : ['.js']
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        // config: {
                        //     path: ''
                        // }
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            exclude: /node_modules/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename : `${PATHS.assets}/css/[name].css`
        }),
        new CopyPlugin({
            patterns: [{
                from : `${PATHS.src}/template`,
                to   : 'template'
            }, {
                from : `${PATHS.src}/images`,
                to   : `${PATHS.assets}/images`
            }]
        })
    ]
};