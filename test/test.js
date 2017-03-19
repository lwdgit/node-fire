const test = require('ava')
const exec = require('./_exec')
test('exec', (t) => {
  let ret = exec('./examples/test.js "1,2,3,4" hello --arg3 world --arg4 "the end"')
  t.is(ret, `[ '1', '2', '3', '4' ] true
hello
world
the end
done`)
  t.pass()
})

test('exec2', (t) => {
  t.is(exec('./examples/test2.js hello name=world !'), 'hello world!')
  t.pass()
})
