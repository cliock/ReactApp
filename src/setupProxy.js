const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/zhgd-admin", {
            target: process.env.REACT_APP_BASE_URL, // 代理域名
            changeOrigin: process.env.NODE_ENV === 'development', // 是否跨域
            pathRewrite: {
                // "^/api": ""
            }
        })
    )
}
