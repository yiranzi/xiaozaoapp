// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    exportPathMap: function () {
        return {
            '/school/center': {page: '/school/center'}
        };
    }
}