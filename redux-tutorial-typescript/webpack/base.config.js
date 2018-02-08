const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/ts/client.tsx',
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        loaders: [
            {
                test: /\.[j|t]sx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'react-hot-loader/webpack'],
                },
            },
        ],
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
};
