const callerId = require('caller-id')
module.exports = process.env.DEBUG === 'log' ? function (...args) {
  let data = callerId.getData()
  console.log(`${data.filePath} > ${data.functionName}:${data.lineNumber}`.blue, '\n', ...args, '\n----------------'.blue)
} : function () {}
