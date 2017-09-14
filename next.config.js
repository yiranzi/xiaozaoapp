const path = require('path');
const glob = require('glob');
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
      },{
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
      });
    // 静态资源路径处理
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        test: /\.js(\?[^?]*)?$/,
        loader: './src/loader/static-path',
        exclude: /node_modules/
      });
    }
    return config;
  },
  exportPathMap: function () {
    return {
      '/school/anyong/schoolExp': {page: '/school/anyong/schoolExp'},
      '/school/anyong/schoolprocess': {page: '/school/anyong/schoolprocess'},
      '/school/anyong/schoolWork': {page: '/school/anyong/schoolWork'},
      '/school/de/schoolExp': {page: '/school/de/schoolExp'},
      '/school/de/schoolprocess': {page: '/school/de/schoolprocess'},
      '/school/de/schoolWork': {page: '/school/de/schoolWork'},
      '/school/kpmg/schoolExp': {page: '/school/kpmg/schoolExp'},
      '/school/kpmg/schoolprocess': {page: '/school/kpmg/schoolprocess'},
      '/school/kpmg/schoolWork': {page: '/school/kpmg/schoolWork'},
      '/school/pwccn/schoolExp': {page: '/school/pwccn/schoolExp'},
      '/school/pwccn/schoolprocess': {page: '/school/pwccn/schoolprocess'},
      '/school/pwccn/schoolWork': {page: '/school/pwccn/schoolWork'},
      '/school/mars/schoolExp': {page: '/school/mars/schoolExp'},
      '/school/mars/schoolprocess': {page: '/school/mars/schoolprocess'},
      '/school/mars/schoolWork': {page: '/school/mars/schoolWork'},
      '/school/mck/schoolExp': {page: '/school/mck/schoolExp'},
      '/school/mck/schoolprocess': {page: '/school/mck/schoolprocess'},
      '/school/mck/schoolWork': {page: '/school/mck/schoolWork'},
      '/school/un/schoolExp': {page: '/school/un/schoolExp'},
      '/school/un/schoolprocess': {page: '/school/un/schoolprocess'},
      '/school/un/schoolWork': {page: '/school/un/schoolWork'},
      '/school/mercer/schoolExp': {page: '/school/mercer/schoolExp'},
      '/school/mercer/schoolprocess': {page: '/school/mercer/schoolprocess'},
      '/school/mercer/schoolWork': {page: '/school/mercer/schoolWork'},
      '/writtentestclock/test': {page: '/writtentestclock/test'},
      '/writtentestclock/answer': {page: '/writtentestclock/answer'},
      '/writtentestclock/pastanswer': {page: '/writtentestclock/pastanswer'},
      '/writtentestclock/choose-class': {page: '/writtentestclock/choose-class'},
      '/writtentestclock/clock-in-intro': {page: '/writtentestclock/clock-in-intro'},
      '/writtentestclock/clock-in-result': {page: '/writtentestclock/clock-in-result'},
      '/writtentestclock/daily-clock-in': {page: '/writtentestclock/daily-clock-in'},
      '/writtentestclock/former-clock-in': {page: '/writtentestclock/former-clock-in'},
      '/writtentestclock/index-clock-in': {page: '/writtentestclock/index-clock-in'},
      '/writtentestclock/test-entry': {page: '/writtentestclock/test-entry'},
      '/writtentestclock/test-result': {page: '/writtentestclock/test-result'},
      '/writtentestclock/more-test': {page: '/writtentestclock/more-test'}
    };
  }
};
