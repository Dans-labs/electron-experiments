const webpack = require("webpack");

module.exports = {
  entry: {
    main: './src/ui/mainWindow.tsx',
    add: './src/ui/addWindow.tsx'
  },
  output: {
    filename: "./bundles/[name].bundle.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    loaders: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'awesome-typescript-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread']
        }
      }
    ]
  },

  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ],
};
