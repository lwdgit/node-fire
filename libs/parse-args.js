const yargs = require('yargs');
const log = require('./log');
const Argv = yargs
    .command(['<any script> [..., arguments]'], 'run a js file or node_modules.', {})
    .help('help')
    .describe('silent', 'Close output')
    .describe('verbose', 'Show more info when excute a script')
    //.demandCommand(1, 'More infomation please visit https://github.com/lwdgit/node-fire')
    .argv

const indexOf = String.prototype.indexOf;

let sperator = ',';
const parseArgs = function(argv) {
    sperator = String(argv.separator || ',');
    let normalArgs = [];
    for (let arg of argv._) {
        if (/^[^\s\\]+\=/.test(arg)) {
            arg = yargs.parse(arg.split(sperator).map(a => '--' + a));
            delete arg._;
            delete arg.$0;
            normalArgs.push(arg);
        } else if (~indexOf.call(arg, sperator)) {
            normalArgs.push(arg.toString().split(sperator).map(i => i.trim()));
        } else {
            normalArgs.push(arg);
        }
    }
    log(normalArgs);
    argv._ = normalArgs;
    return argv
}

module.exports = function(args) {
    let argv = null;
    if (args != null) {
        argv = parseArgs(yargs.parse(args))
    } else {
        argv = parseArgs(Argv)
    }
    return argv
}