#!/usr/bin/env node

const log = require('../libs/util/log')
const parseArgs = require('../libs/parse-args')
const { join } = require('path')
const pkg = require(join(__dirname, '../package.json'))
const vm = require('./vm')
require('colors')

let silent = false

const start = function () {
  let argv = parseArgs()
  log('args', argv)
  if (argv.verbose) {
    process.env['DEBUG'] = argv.verbose === 'true' ? '*' : argv.verbose
  }

  if (argv.version) {
    console.log(`\n${pkg.name} version: ${pkg.version}\n`.yellow)
    return
  }

  silent = argv.silent
  return vm().then(function (ret) {
    return require('../index.js')(argv, ret)
  })
}

const ret = start()
if (ret != null) {
  if (typeof ret === 'object' && ret.then) {
    ret.then(function (ret) {
      if (!silent) {
        console.log(ret)
      }
    }).catch(function (e) {
      console.error(e.red)
    })
  } else {
    console.log(ret)
  }
}
