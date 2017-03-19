exports.a = function () {
  console.log('function a')
  return {
    c: 'deep'
  }
}

exports.b = function * () {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve({
        d: 'delay deep'
      })
    }, 500)
  })
}
