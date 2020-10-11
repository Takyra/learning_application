const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    watchOptions: {
        aggregateTimeout : 100
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
};