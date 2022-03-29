// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16
})

// 使用等比适配插件
module.exports = {
    devServer: {
        host: 'localhost',   //本地
        port: 9090,    //端口号
        open: true   //默认false   true自动打开
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    }
}