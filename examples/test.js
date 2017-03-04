module.exports = function(arg1, arg2, opts) {
    console.log(arg1, Array.isArray(arg1));
    console.log(arg2);
    console.log(opts.arg3);
    console.log(opts.arg4);
    return 'done';
}