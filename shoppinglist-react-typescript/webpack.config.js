const webpack = require("webpack");

module.exports = {
  entry: ['react-hot-loader/patch', './src/js/app/main.tsx'],
  output: {
    filename: "./dist/bundle.js",
  },

  devServer: {
    inline: true,
    port: 8080,
    hot: true
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

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
          plugins: ['transform-class-properties', 'transform-object-rest-spread', 'react-hot-loader/webpack']
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin()
  ]
};
