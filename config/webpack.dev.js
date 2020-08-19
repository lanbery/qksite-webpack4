const { merge } = require('webpack-merge')
const webpack = require("webpack");

const baseWebpackConfig = require('./webpack.base'),
  paths = require('./paths'),
  { dev } = require('./utils');


const ROOT_DIRECTORY = process.cwd()


module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: dev.port,
  },
  plugins: [
    /**
     * 
     */
    new webpack.HotModuleReplacementPlugin()
  ]
});
