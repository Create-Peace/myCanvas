


const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const utils = require('./utils')
// /Users/apple/cDesktop/myCanvas/cavas/src/examples/circleLoading.js
console.log('config', __dirname)


let  distUrl = path.resolve(__dirname, '../dist')
let entries = utils.entries()
let htmlPlugin = utils.htmlPlugin()
console.log('htmlPlugin:::', htmlPlugin)
console.log('entries::::::', entries )
console.log('distUrl:::', chalk.blue(distUrl))
module.exports = {
    entry: entries,
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /(node_modules|bower_components)/,
                include: [
                  path.resolve(__dirname, "../src")
                ]
            }
           
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        // new CleanWebpackPlugin(distUrl),
        // new htmlWebpackPlugin({
        //     inject: true,
        //     filename: 'ParticleAnimator.html', 
        //     template:  './src/examples/ParticleAnimator.html'
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
        // new UglifyJSPlugin()
    ].concat(htmlPlugin)

    // devServer: {
    //     contentBase: path.join(__dirname, "./src/examples/"),
    //     index: 'ParticleAnimator.html',
    //     hot: true,
    //     compress: true,
    //     hot: true,
    //     inline: true,
    //     port: 9000
    //   }
}