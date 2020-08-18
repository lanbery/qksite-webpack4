const path = require('path'),
  { merge } = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base')

const ROOT_DIRECTORY = process.cwd()


module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
});
