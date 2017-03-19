'use strict'
const {
    join
} = require('path')

const lookup = require('./util/require')
const wrap = require('./wrap')
const log = require('./util/log')

function parse (argv, fn) {
  log('input args', argv, fn)
  try {
    this.package = require(join(this.cwd, 'package.json'))
  } catch (e) { }

  if (!fn) {
    let script = argv._.shift()

    if (!script) {
      console.log(`Nothing to do! Please type "fire --help" view more info!`.yellow)
      return
    }

    log(' > loopup script:', script)
    script = lookup(script)

    if (script == null) {
      console.error('Not find a valid js/json file')
      return
    }

    log(`> RUN ${script}\n`)

    fn = require(script)
  }

  fn = wrap(fn)
  return fn(argv)
}

module.exports = parse
