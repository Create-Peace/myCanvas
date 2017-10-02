


const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// /Users/apple/Desktop/myCanvas/cavas/src/examples/circleLoading.js
module.exports = {
    entry: {
       index:  './src/examples/circleLoading.js'
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, 'dist')
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
                  path.resolve(__dirname, "src")
                ]
            }
           
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin('./dist'),
        new htmlWebpackPlugin({
            filename: 'ParticleAnimator.html', 
            template:  './src/examples/ParticleAnimator.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new UglifyJSPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "./src/examples/"),
        index: 'ParticleAnimator.html',
        hot: true,
        compress: true,
        hot: true,
        inline: true,
        port: 9000
      }
}