const exec = function (args, isPipe) {
  return new Promise(function (resolve) {
    console.log('RUN >> ', args)
    var proc = require('child_process').exec(args, {
      env: Object.assign({}, process.env, { isPipe }
    )}, (err, ret) => resolve(String(err || ret || '').trim()))

    proc.stdout.on('data', data => {
      process.stdout.write(data)
    })

    proc.stderr.on('data', err => {
      process.stdout.write(err)
    })
  })
}

module.exports = function (script, bin = 'node ./bin/index', isPipe = false) {
  return exec(bin + ' ' + script, isPipe)
}
