'use strict'
const {
    join
} = require('path');

const {
    isObject,
    isEmpty,
    patternRequire,
    getFuncLength
} = require('./libs/util');

const co = require('co');
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

    if (typeof fn !== 'function') {
        if (isEmpty(fn)) {
            //may be a script empty or not have any exports
            debug('Not exports any function');
            return;
        } else if (isObject(fn)) {
            if (args.length < 2) {
                console.log('Please exports a default function or use second param to chose a function!\nFunction List: \n', fn);
                return;
            }
            let subFnName;
            if ((subFnName = args[0]) in fn) {
                fn = fn[subFnName];
                args = args.slice(1);
                if (typeof fn !== 'function') {
                    return fn;
                }
            } else {
                console.log(script, 'Not exists a object named', subFnName);
                return;
            }
        }
    }

    debug('fn', fn);

    let fnLen = getFuncLength(fn);

    //if input arguments long than accept arguments
    debug('func.length', fnLen, args.length);

    if (args.length < fnLen) {
        let opts = args.pop();
        debug('options === this', opts === this);
        if (opts === this) {
            args = args.concat(new Array(fnLen - args.length - 1));
        }
        args.push(opts);
    }

    let wrap = co.wrap(fn);
    debug('fn', fn);
    debug('wrap', wrap);
    if (typeof wrap !== 'function') return wrap;
    return wrap.apply(this, args);
}