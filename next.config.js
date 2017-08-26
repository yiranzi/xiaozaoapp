module.exports = {
    webpack: (config, {dev}) => {
        //处理weui样式
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
        //静态资源路径处理
        if (process.env.NODE_ENV == 'production') {
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
            '/school/center': {page: '/school/center'}
        };
    }
}
