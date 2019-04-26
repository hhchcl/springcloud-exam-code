require('./check-versions')() // 检测node和npm版本
var config = require('../config') // 获取config/index.js的默认配置
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env // 如果无法判断pro和dev环境，则使用process.env.NODE_ENV作为当前环境
var path = require('path') // 使用node.js自带的文件路径工具
var express = require('express') // 使用express服务
var webpack = require('webpack') // 使用webpack配置
var opn = require('opn') // 一个可以强制打开浏览器并跳转到相应url的插件
var proxyMiddleware = require('http-proxy-middleware') // 使用跨域请求proxyTable
var webpackConfig = require('./webpack.dev.conf') // 使用dev环境的webpack配置
var fs = require('fs') // 寻找相应的文件夹

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port // 如果没有指定运行端口，则使用dev作为运行端口
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable // 使用config.dev.proxyTable的配置作为proxyTable的代理配置

var app = express() // 使用express启动一个服务
var compiler = webpack(webpackConfig) // 启动webpack进行编译

var devMiddleware = require('webpack-dev-middleware')(compiler, { // 启动webpack-dev-middleware，将编译后的配置文件放到内存中
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler) // 启动webpack-hot-middleware，也就是热加载
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) { // 当html-webpack-plugin模版更改时，强制页面刷新
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) { // 将proxyTable中的请求配置挂在express服务上
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')()) // 使用connect-history-api-fallback请求资源，如果不匹配就重定向到执行地址

// serve webpack bundle output
app.use(devMiddleware) // 将暂存在内存中的编译文件挂在express服务上

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware) // 将Hot-load挂在express服务上

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory) // 拼接static文件夹静态资源路径
app.use(staticPath, express.static('./static')) // 为静态资源提供服务

//app.use('./mock', express.static('./mock'))
app.use('/mock',express.static('./mock')) // 指定模拟报文提供服务

app.use((req, res, next) => {
  if (req.url.includes('.do')) {
    const fpath = path.resolve(`./mock/${req.url.replace('/api', '')}.json`)
    res.json(JSON.parse(fs.readFileSync(fpath)))
  } else {
    next()
  }
})

module.exports = app.listen(port, function (err) { // 让express服务监听port端口，并且将此服务作为dev-server.js的接口暴露
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
