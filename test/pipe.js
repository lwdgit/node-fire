const test = require('ava')
const exec = require('./_exec')
test('pipe', (t) => {
  t.is(exec('< examples/calc.js add 3 4'), '7')
  t.is(exec('< examples/calc.js multiply 3 4'), '12')
  t.is(exec('< examples/calc.js pow 3'), '9')
  t.is(exec('< examples/calc.js div 8 0 --b 2'), '4')
})

test('pipe2', (t) => {
  t.is(exec('cat examples/calc.js | node ./bin/index add 3 4', ''), '7')
  t.is(exec('cat examples/calc.js | node ./bin/index multiply 3 4', ''), '12')
  t.is(exec('cat examples/calc.js | node ./bin/index pow 3', ''), '9')
  t.is(exec('cat examples/calc.js | node ./bin/index div 8 0 --b 2', ''), '4')
})
