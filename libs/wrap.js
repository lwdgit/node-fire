const debug = require('debug')('wrap');
const co = require('co');

const {
    isObject,
    isEmpty,
    getFuncLength,
    parseFunc
} = require('./util');

const { concat, slice } = require('./array');


function error(...args) {
    return Promise.reject(args.join(' '));
}

function parseInputs(fn, args) {
    if (typeof fn !== 'function') {
        if (isEmpty(fn)) {
            //may be a script empty or not have any exports
            debug('object can\'t be expand any more');
            return;
        } else if (isObject(fn)) {
            let subFnName;
            if ((subFnName = args[0]) in fn) {
                fn = fn[subFnName];
                slice(args, 1);
                debug('object', fn);
                debug('args', args);
                if (typeof fn !== 'function') {
                    return fn;
                }
            } else {
                return error('Not exists a object named', subFnName);
            }
        }
    }
    return execute(fn, args);
}

function execute(fn, args) {
    let fnLen = getFuncLength(fn);

    //if input arguments long than accept arguments
    debug('func.length', fnLen, args.length);

    if (args.length < fnLen) {
        concat(args, new Array(fnLen - args.length - 1));
    }

    let wrap = co.wrap(fn);

    debug('fn', fn);
    debug('wrap', wrap);
    debug('args', args);
    if (typeof wrap !== 'function') return wrap;
    let ret = wrap.apply(args.slice(-1)[0], args.slice(0, args.length - 1));
    slice(args, fnLen);
    return ret;
}

module.exports = function (fn, script = '') {
    return function (...args) {
        debug('input', args);
        return co(function* () {
            do {
                fn = (yield [parseInputs(fn, args)])[0];
            } while(args.length > 1 && typeof fn !== 'undefined');
            return fn;
        }).catch(function(e) {
            debug('Error: ', e);
            return fn;
        });
    }
}