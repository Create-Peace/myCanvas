var webpack  = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        index: './src/examples/index.js'
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, './dist')
    }
}