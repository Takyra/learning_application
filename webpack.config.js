const {merge}           = require('webpack-merge');
const commonConfig      = require('./config/webpack.common');
const developmentConfig = require('./config/webpack.development');
const productionConfig  = require('./config/webpack.production');

module.exports = env => {
    switch(env) {
        case 'development':
            return merge(commonConfig, developmentConfig);
        case 'production':
            return merge(commonConfig, productionConfig);
        default:
            throw new Error('No matching configuration was found!');
    };
};