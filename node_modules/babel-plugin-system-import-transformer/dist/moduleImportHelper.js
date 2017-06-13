'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImportModuleName = getImportModuleName;

var _babelArgumentProvider = require('./babelArgumentProvider');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isRelativeImport(importPath) {
  // https://nodejs.org/api/modules.html#modules_all_together
  return importPath.startsWith('./') || importPath.startsWith('/') || importPath.startsWith('../');
}

function isNodeModuleImport(importPath) {
  return importPath.indexOf('/') === -1 || !isRelativeImport(importPath);
}

function getImportPath(file, relativeImportPath) {
  var filename = file.opts.filename;
  var filePath = filename.replace(/[^\/]+$/, '');
  var result = _path2.default.join(filePath, relativeImportPath);
  return result;
}

function getImportedModuleFile(crntFile, importedModulePath) {
  // There should be a better way than cloning
  var importedModuleFile = _babelArgumentProvider.types.clone(crntFile);
  importedModuleFile.opts = _babelArgumentProvider.types.cloneDeep(crntFile.opts);
  importedModuleFile.opts.filename = importedModuleFile.opts.filenameRelative = importedModulePath + '.js';

  // importedModuleFile.opts.moduleIds = true;\
  return importedModuleFile;
}

function getImportModuleName(file, importPath) {
  // check if it is a relative path or a module name
  var importedModulePath = isNodeModuleImport(importPath) ? importPath : getImportPath(file, importPath);

  var importedModuleFile = getImportedModuleFile(file, importedModulePath);
  // Use the getModuleName()
  // so that the getModuleId configuration option is called
  var result = importedModuleFile.opts.moduleIds ? importedModuleFile.getModuleName() : importPath;
  return result;
}