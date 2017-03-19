exports.getFuncLength = function getFuncLength (fn) {
  let paramName = parseFunc(fn)
  if (!paramName.trim()) return 0
  return paramName.split(',').length
}
const parseFunc = exports.parseFunc = function (fn) {
  if (/function[^(]*\(([^)]*)/m.test(fn.toString())) {
    return RegExp.$1
  } else {
    return ''
  }
}
