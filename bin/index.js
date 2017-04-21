#!/usr/bin/env node

const log = require('../libs/util/log')
const parseArgs = require('../libs/parse-args')
const { join } = require('path')
const pkg = require(join(__dirname, '../package.json'))
const vm = require('./vm')
const chalk = require('chalk')

let silent = false

const start = function () {
  let argv = parseArgs()
  log('args', argv)
  if (argv.verbose) {
    process.env['DEBUG'] = argv.verbose === 'true' ? '*' : argv.verbose
  }

  if (argv.version) {
    return Promise.resolve(chalk.yellow(`\n${pkg.name} version: ${pkg.version}\n`))
  }

  silent = argv.silent
  return vm()
  .then(function (ret) {
    log(ret)
    return require('../index.js')(argv, ret)
  })
}

start().then(function (ret) {
  if (!silent) {
    console.log(ret)
  }
}).catch(function (e) {
  console.error(chalk.red(e.message), '\n', e)
})
