const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    output: {
        path: path.join(process.cwd(), 'target/build'),
        filename: '[name].bundle.[chunkhash].js',
    },

    plugins: [
        // Clear out `target/build` directory between builds
        new CleanWebpackPlugin(['target/build'], {
            root: process.cwd(),
        }),
        // Minify JS
        new UglifyJsPlugin({
            test: /\.[j|t]sx?($|\?)/i,
            sourceMap: true,
            parallel: true,
            uglifyOptions: {
                ecma: 6,
                // compress: true,
                mangle: true,
            },
            extractComments: true,
        }),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ],
});
