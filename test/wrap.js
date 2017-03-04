const test = require('ava');
const exec = require('./_exec');
test('calc', (t) => {
    t.is(exec('test/fixtures/wrap.js add 3 4', ''), '7');
});