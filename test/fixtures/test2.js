exports.a = function() {
    console.log('function a');
}

exports.b = function*() {
    console.log('function b');
}

exports.c = function(input) {
    console.log(input);
}

exports.d = function() {
    console.log(this.input);
}

exports.e = function(input) {
    console.log(input, this.input);
}