const test = require('ava');
const exec = require('./_exec');
test('calc', (t) => {
    let ret = exec('./test/fixtures/dynamicArgs.js ...2,4');
    console.log(ret);
    t.is('6', ret);
});