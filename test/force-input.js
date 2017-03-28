const test = require('ava')
const exec = require('./_exec')
test('force input', async (t) => {
  let ret = await exec('./test/fixtures/dynamicArgs.js ...2,4')
  console.log(ret)
  t.is('6', ret)
})
