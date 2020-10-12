const webpack      = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: 'localhost',
        port: 8081,
        contentBase: commonConfig.externals.paths.dist,
        open: true,
        compress: true,
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                secure: false
              }
        },
        historyApiFallback: true,
        hot: true,
        inline: true,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 100
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
};