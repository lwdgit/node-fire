var fs   = require('fs') 
var path = require('path')
var { resolvers, getPrefix } = require('./resolvers');

'use strict';

module.exports = require2

function require2(module) {
  try {
    return require(resolve(module))
  } catch (e) {
    throw new Error("Cannot find global module '"+ module +"'")
  }
}

require2.resolve = resolve

require2.globalize = function () {
  global.require2 = require2
}

require2.getPrefix = getPrefix;

function resolve(module, dirname) {
  var i, resolver, modulePath

  for (var resolver in resolvers) {
    if (modulePath = resolvers[resolver](module, dirname)) {
      break
    }
  }
  return modulePath
}
