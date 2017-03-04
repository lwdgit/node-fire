module.exports = function(arg1, arg2) {
    console.log(arg1, Array.isArray(arg1));
    console.log(arg2);
    console.log(this.arg3);
    console.log(this.arg4);
    return 'done';
}