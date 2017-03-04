const requireg = require('./requireg/index');
const { existsSync } = require('fs');
const {
    extname,
    join,
    resolve
} = require('path');

const resolveSync = require('resolve').sync;
const cwd = process.cwd();

const PKG_PREFIX = '';

exports.isObject = function(obj) {
    let type = {}.toString.call(obj);
    return type === '[object Object]' || '[object Array]';
}

exports.patternRequire = function patternRequire(filepath = '.') {
    filepath = String(filepath);
    let fullpath = resolve(filepath);
    if (existsSync(fullpath)) {
        return fullpath;
    } else if (!(fullpath = (requireg.resolve(PKG_PREFIX + filepath)))) {
        return;
    }
    return fullpath;
}

const parseFunc = exports.parseFunc = function(fn) {
    if (/function[^(]*\(([^)]*)/m.test(fn.toString())) {
        return RegExp.$1;
    } else {
        return '';
    }
}

exports.getFuncLength = function getFuncLength(fn) {
    let paramName = parseFunc(fn);
    if (!paramName.trim()) return 0;
    return paramName.split(',').length;
}

exports.isEmpty = function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
