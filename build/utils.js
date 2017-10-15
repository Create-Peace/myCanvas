const path = require('path')
const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/examples')
// 用于做相应的merge处理
const merge = require('webpack-merge')
const chalk = require('chalk')

console.log('PAGE_PATH::', PAGE_PATH)

exports.entries = function () {
    var entryFiles = glob.sync(PAGE_PATH + '/*.js')
    console.log(':::entryFiles', chalk.green(entryFiles))
    var map = {}
    entryFiles.forEach((filePath) => {
        console.log('filePath:::', filePath)
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}


exports.htmlPlugin = function () {
    let entryHtml = glob.sync(PAGE_PATH + '/*.html')
    let arr = []
    entryHtml.forEach((filePath) => {
        console.log('filePath::::', filePath)
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            // 模板来源
            template: filePath,
            // 文件名称
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}