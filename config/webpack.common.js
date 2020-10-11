const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src  : path.join(__dirname, '../src'),
    dist : path.join(__dirname, '../app/static/')
}

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        bundle: PATHS.src
    },

    output: {
        filename: 'js/[name].js',
        path: PATHS.dist
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
                'style-loader',
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
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename  : 'css/[name].css'
        }),
    ]
};

// module.exports = env => {
//     let build = 'dev';

//     if (env.production) {
//         build = 'prod';
//     }

//     return require(`./config/webpack.${build}.js`);
// }