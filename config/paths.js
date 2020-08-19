const path = require('path')

const join = (...p) => path.join(...p)

module.exports = {
  context: path.resolve(__dirname, "../"),
  src: path.resolve(__dirname, "../src"),
  build: path.resolve(__dirname, "../dist"),
  static: path.resolve(__dirname, "../public"),
  favicon: path.resolve(__dirname,'../public/logo.png'),
  join,
};
