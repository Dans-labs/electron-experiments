const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    entry: [
        'react-hot-loader/patch',
        './src/main/typescript/index.tsx',
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
        modules: [
            './src/main/typescript',
            'node_modules',
        ]
    },

    module: {
        rules: [
            {
                test: /\.[j|t]sx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'react-hot-loader/webpack'],
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'app/images/[name].[ext]',
                        }
                    },
                ],
            },
            {
                type: "javascript/auto",
                test: /\.(json)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'app/[name].[ext]',
                        }
                    }
                ]
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: argv.mode === "development",
        }),
        // insert the bundled JavaScript into this file
        new HtmlWebpackPlugin({
            template: './src/main/html/index.html',
        }),
        // Extract imported CSS into own file
        new MiniCssExtractPlugin('[name].bundle.[chunkhash].css'),
    ],
});
