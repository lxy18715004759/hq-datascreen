const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'

// �Ƿ�ʹ��gzip
const productionGzip = true
// ��Ҫgzipѹ�����ļ���׺
const productionGzipExtensions = ['js', 'css']

module.exports = {
    publicPath: '/',
    outputDir: 'dist/',
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {},
    configureWebpack: config => {
        config.devtool = 'source-map'
        if (isProduction) {
            // ��������
            productionGzip && config.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            )
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'))
        config.resolve.alias.set('@assets', resolve('src/assets'))
        config.output.filename('[name].[hash].js').end()
    }
}
