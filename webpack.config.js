const {merge}           = require('webpack-merge');
const commonConfig      = require('./config/webpack.common');
const developmentConfig = require('./config/webpack.development');
const productionConfig  = require('./config/webpack.production');

module.exports = env => {
    if (env.development) {
        return merge(commonConfig, developmentConfig);
    } else if (env.production) {
        return merge(commonConfig, productionConfig);
    } else {
        throw new Error('No matching configuration was found!');
    }
}