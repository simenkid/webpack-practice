var webpack = require('webpack');
var parts = {};

parts.devServer = function (opts) {
    return {
        watchOptions: {
            // delay the rebuild after the first change
            aggregateTimeout: 300,
            // poll interval (ms)
            poll: 1000
        },
        devServer: {
            // good default
            historyApiFallback: true,
            // unlike CLI flag, not set the HMR plugin yet
            hot: true,
            inline: true,
            // only display errors
            stats: 'errors-only',
            // parse host and port from env
            host: opts.host,    // defaults to 'localhost'
            port: opts.port     // defaults to 8080
        },
        plugins: [
            // enable multi-pass compilation, good default
            new webpack.HotModuleReplacementPlugin({ multiStep: true })
        ]
    };
};

parts.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: [ 'style', 'css' ],
                    include: paths
                }
            ]
        }
    };
};

module.exports = parts;
