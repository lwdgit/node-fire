const callerId = require('caller-id');
module.exports = process.env.DEBUG ? function(...args) {
    let data = callerId.getData();
    console.log(`${data.filePath} > ${data.functionName}:${data.lineNumber}`.blue, ...args);
} : function() {};