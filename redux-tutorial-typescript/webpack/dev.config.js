const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'eval-source-map',

    devServer: {
        inline: true,
        port: 8080,
        hot: true,
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
});
