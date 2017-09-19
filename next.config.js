const path = require('path')
const glob = require('glob')

const ToolsUtil = require('./util/tools')

module.exports = {
  webpack: (config, {dev}) => {
    // 处理weui样式
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
      ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      })
    // 静态资源路径处理
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        test: /\.js(\?[^?]*)?$/,
        loader: './loader/static-path',
        exclude: /node_modules/
      })
    }
    // 跳过fs编译
    config.node = {
      fs: 'empty'
    }
    return config
  },
  exportPathMap: function () {
    return ToolsUtil.exportPathMap()
  }
}
