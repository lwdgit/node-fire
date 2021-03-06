var path = require('path')
var resolve = require('resolve').sync
var rc = require('rc')
var isWin32 = process.platform === 'win32'

// resolvers
exports.resolvers = {
  nativeResolve,
  currentPathResolve,
  nodePathResolve,
  userHomeResolve,
  nodeModulesResolve,
  prefixResolve,
  execPathResolve
}
exports.getPrefix = getPrefix

function resolveFn (module, basePath, dirname) {
  try {
    return resolve(module, {
      basedir: path.join(basePath, dirname || '')
    })
  } catch (e) {}
}

// resolve using native require() function
// if NODE_PATH is defined, a global module should be natively resolved
function nativeResolve (module, dirname) {
  try {
    return require.resolve(module, dirname)
  } catch (e) {}
}

function currentPathResolve (module) {
  var i, l, modulePath
  var cwd = process.cwd()

  var paths = [
    'node_modules',
    'node_libraries',
    'node_packages'
  ]

  for (i = 0, l = paths.length; i < l; i += 1) {
    modulePath = resolveFn(module, cwd, paths[i])
    if (modulePath) {
      break
    }
  }

  return modulePath
}

// See: http://nodejs.org/docs/latest/api/modules.html#modules_loading_from_the_global_folders
// required?
function nodePathResolve (module, dirname) {
  var i, l, modulePath
  var nodePath = process.env.NODE_PATH

  if (!nodePath) {
    return
  }

  nodePath = nodePath.split(path.delimiter).map(function (nodepath) {
    return path.normalize(nodepath)
  })

  for (i = 0, l = nodePath.length; i < l; i += 1) {
    modulePath = resolveFn(module, dirname || nodePath[i])
    if (modulePath) {
      break
    }
  }

  return modulePath
}

function userHomeResolve (module) {
  var i, l, modulePath
  var homePath = isWin32 ? process.env['USERPROFILE'] : process.env['HOME']

  var paths = [
    'node_modules',
    'node_libraries',
    'node_packages'
  ]

  for (i = 0, l = paths.length; i < l; i += 1) {
    modulePath = resolveFn(module, homePath, paths[i])
    if (modulePath) {
      break
    }
  }

  return modulePath
}

function getPrefix () {
  var dirname
  var prefix = rc('npm').prefix

  if (isWin32) {
    prefix = prefix || path.join(process.env.APPDATA, 'npm')
    dirname = prefix
  } else {
    prefix = prefix || path.join(path.dirname(process.execPath), '..')
    dirname = path.join(prefix, 'lib')
  }

  dirname = path.join(dirname, 'node_modules')
  return dirname
}

// See: https://npmjs.org/doc/files/npm-folders.html#prefix-Configuration
// it uses execPath to discover the default prefix on *nix and %APPDATA% on Windows
function prefixResolve (module) {
  return resolveFn(module, getPrefix())
}

// Resolves packages using the node installation path
// Useful for resolving global packages such as npm when the prefix has been overriden by the user
function execPathResolve (module) {
  var modulePath, dirname
  var execPath = path.dirname(process.execPath)

  if (isWin32) {
    dirname = execPath
  } else {
    dirname = path.join(execPath, '..', 'lib')
  }

  dirname = path.join(dirname, 'node_modules')
  modulePath = resolveFn(module, dirname)

  return modulePath
}

function nodeModulesResolve (module) {
  var i, l, modulePath
  var nodeModules = process.env['NODE_MODULES']

  if (typeof nodeModules === 'string') {
    nodeModules = nodeModules.split(path.delimiter)
    for (i = 0, l = nodeModules.length; i < l; i += 1) {
      modulePath = resolveFn(module, nodeModules[i])
      if (modulePath) {
        break
      }
    }
  }
  return modulePath
}
