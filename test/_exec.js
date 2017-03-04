const { exec } = require('shelljs');
module.exports = function(script, bin = './bin/index') {
    return exec('node ' + bin + ' ' + script).toString().trim();
}