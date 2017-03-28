const test = require('ava')
const exec = require('./_exec')
test('pipe', async (t) => {
  t.is(await exec('< examples/calc.js add 3 4', undefined, true), '7')
  t.is(await exec('< examples/calc.js multiply 3 4', undefined, true), '12')
  t.is(await exec('< examples/calc.js pow 3', undefined, true), '9')
  t.is(await exec('< examples/calc.js div 8 0 --b 2', undefined, true), '4')
})

test('pipe2', async (t) => {
  t.is(await exec('cat examples/calc.js | node ./bin/index add 3 4', '', true), '7')
  t.is(await exec('cat examples/calc.js | node ./bin/index multiply 3 4', '', true), '12')
  t.is(await exec('cat examples/calc.js | node ./bin/index pow 3', '', true), '9')
  t.is(await exec('cat examples/calc.js | node ./bin/index div 8 0 --b 2', '', true), '4')
})
