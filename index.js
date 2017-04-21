let fire = require('./libs/index')

const wrap = require('./libs/wrap')
const log = require('./libs/util/log')
const parseArgs = require('./libs/parse-args')

fire.wrap = function (fn) {
  return function (args) {
    let argv = parseArgs(args)
    argv._ = argv._.slice(2)
    log(argv)
    return wrap(fn)(argv)
  }
}

module.exports = fire
