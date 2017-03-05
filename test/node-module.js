const test = require('ava');
const exec = require('./_exec');
test('run shelljs', (t) => {
    let filename = 'testfile' + Date.now();
    exec('shelljs touch ' + filename);
    t.regex(exec('shelljs ls'), new RegExp(filename));
    exec('shelljs rm ' + filename);
    t.pass();
});

test('run mathjs', (t) => {
    t.is(exec('mathjs add 5.3 4.2'), '9.5');
    t.pass();
});