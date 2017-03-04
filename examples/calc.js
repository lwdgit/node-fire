exports.add = function(a, b, opts) {
    return a + b;
}

exports.multiply = function*(a = 0, b = 0, opts) {
    return a * b;
}

exports.pow = function(a = 0) {
    return a * a;
}
exports.div = function(a, b, opts) {
    b = b || opts.b;
    return a / b;
}