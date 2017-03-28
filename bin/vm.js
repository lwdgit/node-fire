const stdin = process.stdin

const isPipe = process.env.isPipe == null ? !stdin.isTTY : process.env.isPipe === 'true'

const check = function () {
  return new Promise(function (resolve) {
    if (isPipe) {
      const data = []
      // if not get readable data after 30s, give up
      let tick = setTimeout(function () {
        stdin.end && stdin.end()
        resolve()
      }, 30000)

      stdin.on('readable', function () {
        clearTimeout(tick)
        let chunk = ''
        while ((chunk = this.read(), chunk)) {
          data.push(chunk)
        }
      })
      stdin.on('end', function () {
        resolve(run(data.join('')))
      })
    } else {
      resolve()
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
