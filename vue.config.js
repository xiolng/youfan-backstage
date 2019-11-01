const path = require('path')
const webpack = require('webpack')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // host: '0.0.0.0',
    // disableHostCheck: true,
    proxy: {
      '/system': {
        target: 'http://192.168.1.171:8088',
        pathRewrite: {
          '^/system': '/system'
        }
      },
    }
  }
}
