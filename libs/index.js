'use strict'
const {
    join
} = require('path');

const {
    isObject,
    isEmpty,
    patternRequire,
    getFuncLength
} = require('./util');
const wrap = require('./wrap');

const debug = require('debug')('node-fire');

module.exports = function (...argv) {
    debug('input args', argv);
    this.cwd = process.cwd();
    try {
        this.package = require(join(this.cwd, 'package.json'))
    } catch (e) {}

    let script = argv[0],
        args = argv.slice(1);

    if (!script) {
        console.error(`Not find script ${argv[0]}`);
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
    return fn.apply(this, args);
}