const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/main.js'],
  output: {
    filename: "./bundles/index.js",
    publicPath: "/"
  },
  devServer: {
    inline: true,
    port: 8080,
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread', 'react-hot-loader/babel']
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
