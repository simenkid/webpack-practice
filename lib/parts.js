var webpack = require('webpack');
var parts = {};

parts.devServer = function (opts) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            lazy: false,
            stats: 'errors-only',
            host: opts.host,
            port: opts.port
        },
        plugins: [
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
                    loaders: [ 'style', 'css?modules&localIdentName=[name]__[local]-[hash:base64:5]' ],
                    include: paths
                }
            ]
        }
    };
};

parts.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ]
    };
};

parts.setFreeVariable = function (key, value) {
    var env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

module.exports = parts;
