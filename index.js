let fire = require('./libs/index');

const colors = require('colors');
global.Promise = require('bluebird'); //replace default promise for debug
require('shelljs/global'); //for convient
const wrap = require('./libs/wrap');
const parseArgs = require('./libs/parse-args');

fire.wrap = function(fn) {
    return function(args) {
        let argv = parseArgs(args);
        argv = argv.slice(2);
        return wrap(fn)(...argv);
    }
}

module.exports = fire;