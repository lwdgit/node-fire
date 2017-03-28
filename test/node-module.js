const test = require('ava')
const exec = require('./_exec')
test('run shelljs', async (t) => {
  let filename = '0000testfile' + Date.now()
  await exec('shelljs touch ...' + filename)
  t.regex(await exec('shelljs ls'), new RegExp(filename))
  t.is(await exec('shelljs ls ..../ 0'), filename)
  await exec('shelljs rm ...' + filename)
  t.pass()
})

test('run mathjs', async (t) => {
  t.is(await exec('mathjs add 5.3 4.2'), '9.5')
  t.pass()
})
