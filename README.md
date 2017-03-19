# node-fire

> Run a js object, Promise, Generator or a function by command line directly.

## Install

```
$ npm install -g node-fire
```

## How to use

```
$ fire ./test.js arg1 arg2 name=john
```

### Fire third party node modules

```bash
> npm install md5
> fire md5 test
> npm install uuid
> fire uuid
> npm install open
> fire open http://127.0.0.1
...
```

[More Example](./examples.md)

### Fire remote js
> curl https://raw.githubusercontent.com/lwdgit/node-fire/dev/examples/calc.js | fire add 1 2

### Fire local

#### Test1 
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
    RUN
    ```
    fire ./test.js "1,2,3,4" hello --arg3 world --arg4 "the end"
    ```
    Output:

    ```
    [ '1', '2', '3', '4' ] true
    hello
    world
    the end
    done
    ```

#### Test2

```javascript
//test2.js
module.exports = function (a, opts, c) {
  return `${a} ${opts.name}${c}`
}
```
RUN
```
fire ./test2.js hello name=world !
```
Output:

```
hello world!
```

#### One more

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
RUN
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

### As a npm scripts runner

```
//package.json
{
  "scripts": {
    "open": "fire open http://127.0.0.1",
    "copy": "fire shelljs cp package.json package.json2",
    "combo": "fire mathjs random 0 100 | xargs touch ",
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
mkdir quick_test && cd quick_test
cat << EOF > package.json
{
  "scripts": {
    "open": "fire open http://127.0.0.1",
    "copy": "fire shelljs cp ...package.json,package.json2",
    "combo": "fire mathjs random 0 100 | xargs touch ",
    "math": "fire mathjs add 42423.321 32132",
    "ls": "fire shelljs ls stdout"
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

> More usage please checkout [tests](https://github.com/lwdgit/node-fire/tree/dev/test)

## Debug

> DEBUG=log fire xxx.js

## Contribution

 [Fork](https://github.com/lwdgit/node-fire#fork-destination-box)

 [Issues](https://github.com/lwdgit/node-fire/issues)

## LICENSE
Under MIT license

