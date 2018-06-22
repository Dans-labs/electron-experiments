const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => merge(baseConfig(env, argv), {
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'eval-source-map',
    output: {
        publicPath: "/"
    },

    devServer: {
        inline: true,
        host: '000.000.00.00',
        port: 3000,
        hot: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true},
                    },
                    {
                        loader: 'postcss-loader',
                        options: {config: {path: 'webpack/postcss.config.js'}},
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
});
