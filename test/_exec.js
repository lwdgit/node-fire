const { exec } = require('shelljs');
module.exports = function(script) {
    return exec('node ./bin/index ' + script);
}