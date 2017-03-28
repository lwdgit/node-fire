const test = require('ava')
const exec = require('./_exec')
test('calc', async (t) => {
  t.is(await exec('test/fixtures/wrap.js add 3 4', 'node'), '7')
})
