
const debug = require('debug')('node-fire:bin');
const join = require('path').join;


const parseArgs = require('../libs/parse-args');
const pkg = require(join(__dirname, '../package.json'));


const start = function () {
    let {argv, opts} = parseArgs();
    debug('args', argv);
    return require('../index.js').apply(opts, argv);
}

const ret = start();
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