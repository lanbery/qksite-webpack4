const { merge } = require("webpack-merge");
const webpack = require("webpack");


const baseWebpackConfig = require("./webpack.base"),
  paths = require("./paths"),
  { build } = require("./utils");

module.exports = merge(baseWebpackConfig,{
  mode:'production',
  output:{
    publicPath:'/',
  }
})
