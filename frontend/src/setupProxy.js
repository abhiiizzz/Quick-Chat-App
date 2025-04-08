const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ap',
        createProxyMiddleware({
            target: 'https://quick-chat-app-3.onrender.com/',
            changeOrigin: true,
        })
    );
};
