var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    validate = require('webpack-validator');

var parts = require('./lib/parts');

var PATHS = {
    // it is sugguested to use path.join() to generate absolute paths
    // you can use node.js API path.resolve(), it's ok too
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'webpack demo' })
    ]
};

var config = {};

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, parts.setupCSS(PATHS.app));
        break;
    default:
        config = merge(common, 
            parts.setupCSS(PATHS.app),
            parts.devServer({
                // customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);
