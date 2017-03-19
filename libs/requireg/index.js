var { resolvers, getPrefix } = require('./resolvers')

module.exports = require2

function require2 (module) {
  try {
    return require(resolve(module))
  } catch (e) {
    throw new Error("Cannot find global module '" + module + "'")
  }
}

require2.resolve = resolve

require2.globalize = function () {
  global.require2 = require2
}

require2.getPrefix = getPrefix

function resolve (module, dirname) {
  var modulePath

  for (var resolver in resolvers) {
    modulePath = resolvers[resolver](module, dirname)
    if (modulePath) {
      break
    }
  }
  return modulePath
}
