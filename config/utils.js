const path = require('path')

const env = require('./env')

const dev = {
  port: env.PORT,
  host: "localhost",
  autoOpenBrowser: true,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false,
}

module.exports = {
  dev,
};
