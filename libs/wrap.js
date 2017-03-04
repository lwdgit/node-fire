const debug = require('debug')('wrap');
const co = require('co');

const {
    isObject,
    isEmpty,
    getFuncLength,
    parseFunc
} = require('./util');

function error(...args) {
    return Promise.reject(args.join(' '));
}

module.exports = function (fn, script = '') {
    return function (...args) {
        debug('input', args);
        if (typeof fn !== 'function') {
            if (isEmpty(fn)) {
                //may be a script empty or not have any exports
                debug('Not exports any function');
                return error('Not exports any function');
            } else if (isObject(fn)) {
                if (args.length < 2) {
                    console.log('Please exports a default function or use second param to chose a function!\nFunction List: \n', fn);

                    return error('Please exports a default function or use second param to chose a function!');
                }
                let subFnName;
                if ((subFnName = args[0]) in fn) {
                    fn = fn[subFnName];
                    args = args.slice(1);
                    if (typeof fn !== 'function') {
                        return fn;
                    }
                } else {
                    return error(script, 'Not exists a object named', subFnName);
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
        debug('args', args);
        if (typeof wrap !== 'function') return wrap;
        return wrap.apply(this, args);
    }
}