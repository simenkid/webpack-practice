var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    validator = require('webpack-validator');

var parts = require('./lib/parts');

var PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var config = {};
var common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'my webpack practice' })
    ]
};

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            parts.setupCSS(PATHS.app)
        );
        break;
    default:
        config = merge(
            common,
            parts.setupCSS(PATHS.app),
            parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validator(config);
