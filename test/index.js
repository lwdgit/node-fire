const test = require('ava')
const exec = require('./_exec')
test('exec', (t) => {
  exec('./test/fixtures/test.js')
  t.pass()
})

test('relative path', (t) => {
  exec('test/fixtures/test.js')
  t.pass()
})

test('json & multi params', (t) => {
  t.is(exec('./test/fixtures/test.json repository type'), 'git')
  t.pass()
})

test('test2', (t) => {
  t.is(exec('./test/fixtures/test2.js'), `{ a: [Function],
  b: [Function],
  c: [Function],
  d: [Function],
  e: [Function] }`)
})

test('test2 with second param', (t) => {
  exec('./test/fixtures/test2.js a')
})

test('deep get', t => {
  t.is(exec('./test/fixtures/deep.js b d'), 'delay deep')
  t.pass()
})
