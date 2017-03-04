const yargs = require('yargs');
const Argv = yargs
    .help('help')
    .describe('separator', 'Sets the separator to commit array params, default is , ')
    .describe('verbose', "Show more info when excute a script")
    .argv;


let sperator = ',';
const parseArgs = function (argv) {
    sperator = String(argv.separator || ',');
    let normalArgs = [];
    if (!argv._.length) normalArgs.push(undefined); //第一个参数只能为字符串
    for (let arg of argv._) {
        if (~String.prototype.indexOf.call(arg, sperator)) {
            normalArgs.push(arg.toString().split(sperator).map((i) => i.trim()));
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

module.exports = function(args) {
    let argv = null;
    if (args != null) {
        argv = parseArgs(yargs.parse(args));
    } else {
        argv = parseArgs(Argv);  
    }
    if (argv == null) return;
    let opts = argv[argv.length - 1];
    return {
        argv,
        opts
    };
};