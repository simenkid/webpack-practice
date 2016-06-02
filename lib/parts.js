var webpack = require('webpack');
var parts = {};

parts.devServer = function (opts) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: opts.host,
            port: opts.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({ multiStep: true })
        ]
    };
};

module.exports = parts;
