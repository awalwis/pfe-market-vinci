const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://pfe-market-vinci-backend.herokuapp.com',
            changeOrigin: true,
        })
    );
};