const test = require('ava')
const exec = require('./_exec')
test('exec', async (t) => {
  let ret = await exec('./examples/test.js "1,2,3,4" hello --arg3 world --arg4 "the end"')
  t.is(ret, `[ '1', '2', '3', '4' ] true
hello
world
the end
done`)
  t.pass()
})

test('exec2', async (t) => {
  t.is(await exec('./examples/test2.js hello name=world !'), 'hello world!')
  t.pass()
})

test('should catch error', async t => {
  const ret = await exec('./test/fixtures/error.js')
  t.is(ret, '')
})
