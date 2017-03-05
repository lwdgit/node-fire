const debug = require('debug')('wrap');
const co = require('co');
const log = require('./log');

const {
    isEmpty,
    getFuncLength,
} = require('./util');

const { slice } = require('./array');

function* getFunction (fn, args, opts) {
    log(typeof fn, args);

    if (typeof fn !== 'function') {
        if (isEmpty(fn)) {
            //may be a script empty or not have any exports
            debug('object can\'t be expand any more');
            return;
        }
        
        if (typeof fn === 'object' && args.length) {
            let subFnName = args[0];
            slice(args, 1);
            log(subFnName);
            if (subFnName === undefined) return;
            if (subFnName in fn) {
                log(subFnName, fn);
                fn = fn[subFnName];
                log('object', fn);
                log('args', args);
                if (typeof fn !== 'function') {
                    return fn;
                }
            } else {
                return;
            }
        } else {
            return fn;
        }
    }
    log(typeof fn, args);
    return yield execute(fn, args, opts);
}

function* execute(fn, args, opts) {
    let fnLen = getFuncLength(fn);
    if (typeof fn !== 'function') return (yield [fn])[0];

    let wrap = co.wrap(fn);
    log('fn', typeof fn, args[0]);

    //if input arguments long than accept arguments
    debug('func.length', fnLen, args.length);

    if (/^\.{3}(.+)$/m.test(args[0])) {
        let tmpArg = RegExp.$1.split(',');
        args.splice(0, 1, ...tmpArg);
        fnLen = tmpArg.length;
    }

    // if (args.length < fnLen) {
    //     concat(args, new Array(fnLen - args.length));
    // }

    log('args', args);

    log(args.slice(0, fnLen));
    let ret = wrap.apply(opts, args.slice(0, fnLen));
    slice(args, fnLen);
    log(fnLen, ret);
    return ret;
}

module.exports = function (fn) {
    return function (argv) {
        let args = argv._;
        log('input', argv);
        return co(function* gen() {
            do {
                fn = yield getFunction(fn, args, argv);
            } while(args.length > 0 && typeof fn !== 'undefined');
            return fn;
        }).catch(function(e) {
            console.log('Error: ', e);
            return fn;
        });
    }
}