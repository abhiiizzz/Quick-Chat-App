const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ap',
        createProxyMiddleware({
            target: 'http://mern-backend:5000',
            changeOrigin: true,
        })
    );
};
