const webpack = require("webpack");

module.exports={
  entry:{
    main: './mainWindow.js',
    add: './addWindow.js'
  },
  output:{
    filename: './bundles/[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query:{
          presets:['react','es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ]
}
