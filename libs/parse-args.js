const yargs = require('yargs');
const Argv = yargs
    .help('help')
    .describe('separator', 'Sets the separator to commit array params, default is , ')
    .describe('verbose', "Show more info when excute a script")
    .argv;

const indexOf = String.prototype.indexOf;

let sperator = ',';
const parseArgs = function (argv) {
    sperator = String(argv.separator || ',');
    let normalArgs = [];
    for (let arg of argv._) {
        if (~indexOf.call(arg, sperator)) {
            normalArgs.push(arg.toString().split(sperator).map(i => i.trim()));
        } else {
            normalArgs.push(arg);
        }
    }
    argv._ = normalArgs;
    return argv;
};

module.exports = function(args) {
    let argv = null;
    if (args != null) {
        argv = parseArgs(yargs.parse(args));
    } else {
        argv = parseArgs(Argv);  
    }
    return argv; 
};