const test = require('ava')
const exec = require('./_exec')
test('exec', async (t) => {
  await exec('./test/fixtures/test.js')
  t.pass()
})

test('relative path', async (t) => {
  await exec('test/fixtures/test.js')
  t.pass()
})

test('json & multi params', async (t) => {
  t.is(await exec('./test/fixtures/test.json repository type'), 'git')
  t.pass()
})

test('test2', async (t) => {
  t.is(await exec('./test/fixtures/test2.js'), `{ a: [Function],
  b: [Function],
  c: [Function],
  d: [Function],
  e: [Function] }`)
})

test('test2 with second param', async (t) => {
  await exec('./test/fixtures/test2.js a')
})

test('deep get', async (t) => {
  t.is(await exec('./test/fixtures/deep.js b d'), 'delay deep')
  t.pass()
})
