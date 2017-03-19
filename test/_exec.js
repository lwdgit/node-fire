const exec = require('shelljs').exec
module.exports = function (script, bin = 'node ./bin/index') {
  console.log('RUN>', bin + ' ' + script)
  return exec(bin + ' ' + script).toString().trim()
}
