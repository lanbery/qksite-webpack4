const pkgJson = require('../package.json')

/**
 * tiny env wrapper
 */
module.exports = {
  PORT: process.env.PORT || 8900,
  title: process.env.title || pkgJson.name,
}
