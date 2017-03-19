const requireg = require('../requireg/index')
const { existsSync } = require('fs')
const {
    resolve
} = require('path')

const PKG_PREFIX = ''

module.exports = function lookup (filepath = '.') {
  filepath = String(filepath)
  let fullpath = resolve(filepath)
  if (existsSync(fullpath)) {
    return fullpath
  } else if (!(fullpath = (requireg.resolve(PKG_PREFIX + filepath)))) {
    return
  }
  return fullpath
}
