const callerId = require('caller-id')
const chalk = require('chalk')
module.exports = process.env.DEBUG === 'log' ? function (...args) {
  let data = callerId.getData()
  console.log(
    chalk.blue(`${data.filePath} > ${data.functionName}:${data.lineNumber}`),
    '\n',
    ...args,
    chalk.blue('\n----------------')
  )
} : function () {}
