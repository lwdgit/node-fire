const test = require('ava')
const exec = require('./_exec')
test('calc', (t) => {
  t.is(exec('< examples/calc.js add 3 4'), '7')
  t.is(exec('< examples/calc.js multiply 3 4'), '12')
  t.is(exec('< examples/calc.js pow 3'), '9')
  t.is(exec('< examples/calc.js div 8 0 --b 2'), '4')
})
