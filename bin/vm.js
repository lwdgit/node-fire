const { isTTY } = process.stdin

const isPipe = !isTTY && 'start' in process.stdin

const check = function () {
  return new Promise(function (resolve) {
    if (isPipe) {
      const data = []
      process.stdin.on('readable', function () {
        let chunk = ''
        while ((chunk = this.read(), chunk)) {
          data.push(chunk)
        }
      })
      process.stdin.once('end', function () {
        resolve(run(data.join('')))
      })
    } else {
      resolve(undefined)
    }
  })
}

function run (src) {
  const m = require('module')
  const exports = {}
  const module = { exports }
  require('vm').runInThisContext(m.wrap(src))(exports, require, module, __filename, __dirname)
  return module.exports
}

module.exports = check
