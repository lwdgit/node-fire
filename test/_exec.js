const { exec } = require('shelljs');
module.exports = function(script, bin = 'node ./bin/index') {
    return exec(bin + ' ' + script).toString().trim();
}