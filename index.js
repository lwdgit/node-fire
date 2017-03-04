let fire = require('./libs/index');

const colors = require('colors');
global.Promise = require('bluebird'); //replace default promise for debug
require('shelljs/global'); //for convient
const wrap = require('./libs/wrap');
const parseArgs = require('./libs/parse-args');

fire.wrap = function(fn) {
    return function(args) {
        let {argv, opts} = parseArgs(args);
        opts['_'] = opts['_'].slice(1);
        argv = argv.slice(2);
        return wrap(fn).apply(opts, argv);
    }
}

module.exports = fire;