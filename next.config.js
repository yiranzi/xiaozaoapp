const path = require('path')
const glob = require('glob')

module.exports = {
    webpack: (config, {dev}) => {
        config.module.rules.push(
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        )
        return config;
    }
}