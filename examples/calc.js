exports.add = function(a, b, opts) {
    return a + b;
}

exports.multiply = function*(a, b, opts) {
    return a * b;
}

exports.pow = function(a) {
    return a * a;
}
exports.div = function(a, b, opts) {
    b = b || opts.b;
    return a / b;
}