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

### With third party node-modules 

1. [shelljs](https://github.com/shelljs/shelljs)

    ```
    $ npm install shelljs
    $ fire shelljs touch 1.txt
    $ fire shelljs rm 1.txt
    ```

2. [mathjs](https://github.com/josdejong/mathjs)

    ```
    $ npm install mathjs
    $ fire mathjs add 5.1 5.2
    ```

3. [node-open](https://github.com/josdejong/mathjs)

    ```
    $ npm install open
    $ fire open index.html
    $ fire open http://127.0.0.1
    ```

> TIPs: node-fire not wrap these modules(just a function runner), so you should install these modules manualy.

### As a npm scripts

```
//package.json
{
  "scripts": {
    "open": "fire open http://127.0.0.1",
    "copy": "fire shelljs cp package.json package.json2",
    "combo": "fire mathjs random 0 100 | xargs fire shelljs touch ",
    "math": "fire mathjs add 42423.321 32132"
  },
  "devDependencies": {
    "mathjs": "^3.9.3",
    "open": "^0.0.5",
    "shelljs": "^0.7.6",
    "node-fire": "latest"
  }
}
```
quick test:

```
mkdir test && cd test
cat << EOF > package.json
{
  "scripts": {
    "open": "fire open http://127.0.0.1",
    "copy": "fire shelljs cp package.json package.json2",
    "combo": "fire mathjs random 0 100 | xargs fire shelljs touch ",
    "math": "fire mathjs add 42423.321 32132"
  },
  "devDependencies": {
    "mathjs": "^3.9.3",
    "open": "^0.0.5",
    "shelljs": "^0.7.6",
    "node-fire": "latest"
  }
}
EOF

npm install
npm run math
npm run copy
npm run combo
npm run open

```

### God Mode
```
//test.js
module.exports = function(arg1, arg2) {
    console.log(arg1, Array.isArray(arg1));
    console.log(arg2);
    console.log(this.arg3);
    console.log(this.arg4);
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
exports.add = function(a, b) {
    return a + b;
}

exports.multiply = function*(a, b) {
    return a * b;
}

exports.pow = function(a) {
    return a * a;
}
exports.div = function(a, b) {
    b = b || this.b;
    return a / b;
}
```

```
fire ./calc.js add 3 4                // 7
fire ./calc.js multiply 3 4           // 12
fire ./calc.js pow 3                  //9
fire examples/calc.js div 8 0 --b=2   //4         
```

### As a wrapper
```
//wrap.js
const { wrap } = require('node-fire');
const calc = function(a, b) {
    return a + b;
}

wrap(calc)(process.argv)
.then(function (ret) {
    console.log(ret);
});
```

```
node ./wrap.js 3 4
```

## LICENSE
Under MIT license

