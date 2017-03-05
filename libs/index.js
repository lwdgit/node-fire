'use strict'
const {
    join
} = require('path');

const {
    patternRequire,
} = require('./util');
const wrap = require('./wrap');

const debug = require('debug')('node-fire');

module.exports = function (argv) {
    debug('input args', argv);
    try {
        this.package = require(join(this.cwd, 'package.json'))
    } catch (e) {}

    let script = argv._.shift();

    if (!script) {
        console.log(`Nothing to do! Please type "fire --help" view more info!`.yellow);
        return;
    }

    debug(' > loopup script:', script);
    script = patternRequire(script);

    if (script == null) {
        console.error('Not find a valid js/json file');
        return;
    }

    debug(`> RUN ${script}\n`);

    debug(' > ha, got it', script);

    let fn = require(script);
    fn = wrap(fn);
    return fn(argv);
}