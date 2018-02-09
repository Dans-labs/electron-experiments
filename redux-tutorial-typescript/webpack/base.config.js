const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/ts/client.tsx',
    ],

    output: {
        path: __dirname + '../target/',
        filename: 'easy-deposit-ui.bundle.js'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.[j|t]sx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'react-hot-loader/webpack'],
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                    ],
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "app/images/[name].[ext]",
                        }
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        // insert the bundled JavaScript into this file
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        // Extract imported CSS into own file
        new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    ],
};
