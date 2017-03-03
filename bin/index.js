#!/usr/bin/env node

const debug = require('debug')('node-fire:bin');
const join = require('path').join;

const colors = require('colors');
global.Promise = require('bluebird'); //replace default promise for debug
require('shelljs/global'); //for convien

const pkg = require(join(__dirname, '../package.json'));

const argv = require('yargs')
    .help('help')
    .describe('separator', 'Sets the separator to commit array params, default is , ')
    .describe('verbose', "Show more info when excute a script")
    .argv;

const SPEARATOR = String(argv.separator || ',');

const parseArgs = function (argv) {
    let normalArgs = [];
    if (!argv._.length) normalArgs.push(undefined); //第一个参数只能为字符串
    for (let arg of argv._) {
        if (~String.prototype.indexOf.call(arg, SPEARATOR)) {
            normalArgs.push(arg.toString().split(SPEARATOR).map((i) => i.trim()));
        } else {
            normalArgs.push(arg);
        }
    }
    normalArgs.push(argv);
    if (argv.verbose) {
        process.env['DEBUG'] = argv.verbose == 'true' ? '*' : argv.verbose;
    }

    if (argv.version) {
        console.log(`\n${pkg.name} version: ${pkg.version}\n`.yellow);
        return;
    }
    return normalArgs;
};

const start = function (argv) {
    let args = parseArgs(argv);
    if (args == null) return;
    let opts = args[args.length - 1];
    debug('args', args);
    return require('../index.js').apply(opts, args);
}

const ret = start(argv);
if (ret != null) {
    if (typeof ret === 'object' && ret.then) {
        ret.then(function (ret) {
            if (ret != null) {
                console.log(ret);
            }
        }).catch(function (e) {
            console.error(e.red);
        })
    } else {
        console.log(ret);
    }
}