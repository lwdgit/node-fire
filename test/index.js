const test = require('ava');
const exec = require('./_exec');
test('exec', (t) => {
    exec('./test/fixtures/test.js');
    t.pass();
});

test('path autocomplete', (t) => {
    exec('./test/fixtures/test');
    t.pass();
});


test('json & multi params', (t) => {
    exec('./test/fixtures/test.json name');
    t.pass();
});

test('test2', (t) => {
    exec('./test/fixtures/test2.js');
});

test('test2 with second param', (t) => {
    exec('./test/fixtures/test2.js a');
});