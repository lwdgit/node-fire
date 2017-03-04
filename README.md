# node-fire

> Run a js object or a function by command line directly.

## Install

```
$ npm install -g node-fire
```

## How to use
```
$ fire ./test.js arg1 arg2
```

## Examples

```
//test.js
module.exports = function(arg1, arg2, opts) {
    console.log(arg1, Array.isArray(arg1));
    console.log(arg2);
    console.log(opts.arg3);
    console.log(opts.arg4);
    return 'done';
}
```
```
fire ./test.js "1,2,3,4" hello --arg3 world --arg4 "the end"
```
The output:

```
[ '1', '2', '3', '4' ] true
hello
world
the end
done
```

One more:
```
//calc.js
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
```

```
fire ./calc.js add 3 4                // 7
fire ./calc.js multiply 3 4           // 12
fire ./calc.js pow 3                  //9
fire examples/calc.js div 8 0 --b=2   //4         
```

## LICENSE
Released under MIT license