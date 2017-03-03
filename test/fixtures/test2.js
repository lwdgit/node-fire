exports.a = function() {
    console.log('function a');
}

exports.b = function*() {
    console.log('function b');
}

exports.c = function(input) {
    console.log(input);
}

exports.d = function(opts= {}) {
    console.log(opts.input);
}

exports.e = function(input, opts = {}) {
    console.log(input, opts.input);
}