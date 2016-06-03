var webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin');
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

parts.extractBundle = function (opts) {
    var entry = {};
    entry[opts.name] = opts.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [ opts.name, 'manifest' ],
                minChunks: Infinity
            })
        ]
    };
};

parts.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([ path ], {
                root: process.cwd()
            })
        ]
    };
};

module.exports = parts;
