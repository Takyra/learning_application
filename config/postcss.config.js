module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('autoprefixer'),
        require('css-mquery-packer'),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        }),
    ]
}