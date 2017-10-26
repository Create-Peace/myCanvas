const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
var path  = require('path')
var chalk = require('chalk')



var contentBase = path.resolve(__dirname, '../src/examples')
console.log('contentBase', chalk.red(contentBase))

const config = require('./webpack.config.js');
const options = {
  contentBase: contentBase,
  hot: true,
  host: 'localhost',
  open: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config)

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
// console.log(chalk.red(JSON.stringify(compiler)))
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000')
});