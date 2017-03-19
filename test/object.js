const test = require('ava')
const exec = require('./_exec')
test('object', (t) => {
  let ret = exec('./test/fixtures/object.js 1 b=2 3')
  console.log(ret)
  t.is('6', ret)
})
