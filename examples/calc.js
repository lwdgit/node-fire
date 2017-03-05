exports.add = function(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    return a + b;
}

exports.multiply = function*(a = 0, b = 0) {
    return a * b;
}

exports.pow = function(a = 0) {
    return a * a;
}
exports.div = function(a, b) {
    b = b || this.b;
    return a / b;
}