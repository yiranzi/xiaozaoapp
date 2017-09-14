module.exports = {
  webpack: (config, {dev}) => {
    // 处理weui样式
    config.module.rules.push(
      {
        test: /\.(css)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
      ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
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
      '/school/navigation': {page: '/school/navigation'},
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
      '/school/jd/schoolExp': {page: '/school/jd/schoolExp'},
      '/school/jd/schoolprocess': {page: '/school/jd/schoolprocess'},
      '/school/jd/schoolWork': {page: '/school/jd/schoolWork'},
      '/school/zhaoshang/schoolExp': {page: '/school/zhaoshang/schoolExp'},
      '/school/zhaoshang/schoolprocess': {page: '/school/zhaoshang/schoolprocess'},
      '/school/zhaoshang/schoolWork': {page: '/school/zhaoshang/schoolWork'},
      '/school/qiangsheng/schoolExp': {page: '/school/qiangsheng/schoolExp'},
      '/school/qiangsheng/schoolprocess': {page: '/school/qiangsheng/schoolprocess'},
      '/school/qiangsheng/schoolWork': {page: '/school/qiangsheng/schoolWork'},
      '/school/ali/schoolExp': {page: '/school/ali/schoolExp'},
      '/school/ali/schoolprocess': {page: '/school/ali/schoolprocess'},
      '/school/ali/schoolWork': {page: '/school/ali/schoolWork'},
      '/school/acc/schoolExp': {page: '/school/acc/schoolExp'},
      '/school/acc/schoolprocess': {page: '/school/acc/schoolprocess'},
      '/school/acc/schoolWork': {page: '/school/acc/schoolWork'},
      '/school/bain/schoolExp': {page: '/school/bain/schoolExp'},
      '/school/bain/schoolprocess': {page: '/school/bain/schoolprocess'},
      '/school/bain/schoolWork': {page: '/school/bain/schoolWork'},
      '/school/bdo/schoolExp': {page: '/school/bdo/schoolExp'},
      '/school/bdo/schoolprocess': {page: '/school/bdo/schoolprocess'},
      '/school/bdo/schoolWork': {page: '/school/bdo/schoolWork'},
      '/school/didi/schoolExp': {page: '/school/didi/schoolExp'},
      '/school/didi/schoolprocess': {page: '/school/didi/schoolprocess'},
      '/school/didi/schoolWork': {page: '/school/didi/schoolWork'},
      '/school/ford/schoolExp': {page: '/school/ford/schoolExp'},
      '/school/ford/schoolprocess': {page: '/school/ford/schoolprocess'},
      '/school/ford/schoolWork': {page: '/school/ford/schoolWork'},
      '/school/meituan/schoolExp': {page: '/school/meituan/schoolExp'},
      '/school/meituan/schoolprocess': {page: '/school/meituan/schoolprocess'},
      '/school/meituan/schoolWork': {page: '/school/meituan/schoolWork'},
      '/school/hsbc/schoolExp': {page: '/school/hsbc/schoolExp'},
      '/school/hsbc/schoolprocess': {page: '/school/hsbc/schoolprocess'},
      '/school/hsbc/schoolWork': {page: '/school/hsbc/schoolWork'},
      '/school/zhada/schoolExp': {page: '/school/zhada/schoolExp'},
      '/school/zhada/schoolprocess': {page: '/school/zhada/schoolprocess'},
      '/school/zhada/schoolWork': {page: '/school/zhada/schoolWork'},
      '/school/nier/schoolExp': {page: '/school/nier/schoolExp'},
      '/school/nier/schoolprocess': {page: '/school/nier/schoolprocess'},
      '/school/nier/schoolWork': {page: '/school/nier/schoolWork'},
      '/school/tianzhi/schoolExp': {page: '/school/tianzhi/schoolExp'},
      '/school/tianzhi/schoolprocess': {page: '/school/tianzhi/schoolprocess'},
      '/school/tianzhi/schoolWork': {page: '/school/tianzhi/schoolWork'},
      '/school/zhitong/schoolExp': {page: '/school/zhitong/schoolExp'},
      '/school/zhitong/schoolprocess': {page: '/school/zhitong/schoolprocess'},
      '/school/zhitong/schoolWork': {page: '/school/zhitong/schoolWork'},
      '/school/yiqi/schoolExp': {page: '/school/yiqi/schoolExp'},
      '/school/yiqi/schoolprocess': {page: '/school/yiqi/schoolprocess'},
      '/school/yiqi/schoolWork': {page: '/school/yiqi/schoolWork'},
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
      '/writtentestclock/more-test': {page: '/writtentestclock/more-test'},
      '/writtentestclock/preview-prize': {page: '/writtentestclock/preview-prize'},
      '/writtentestclock/exam-result': {page: '/writtentestclock/exam-result'}
    };
  }
};
