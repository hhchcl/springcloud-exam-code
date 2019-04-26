/* eslint-disable */
require('eventsource-polyfill') // 提供支持某些浏览器的监听
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
