const path = require('path');
const glob = require('glob');

const ToolsUtil = require('./src/util/tools');

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
      }, {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      })
    // 静态资源路径处理
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        test: /\.js(\?[^?]*)?$/,
        loader: './loader/static-path',
        exclude: /node_modules/
      })
    }
    config.target = 'async-node';
    return config;
  },
  exportPathMap: function () {
    return ToolsUtil.exportPathMap();
  }
}
