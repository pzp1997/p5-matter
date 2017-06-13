'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _babelArgumentProvider = require('./babelArgumentProvider');

var _moduleImportHelper = require('./moduleImportHelper');

var _promiseUtils = require('./promiseUtils');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SystemImportExpressionTransformer = function () {
  function SystemImportExpressionTransformer(state, params) {
    _classCallCheck(this, SystemImportExpressionTransformer);

    this.state = state;
    this.file = state.file;
    this.pluginOptions = this.state.opts;
    this.moduleType = this.pluginOptions.modules;
    var param = params[0];

    this.importedModuleExpression = param.node;
    this.moduleNameExpression = this.importedModuleExpression;

    if (this.importedModuleExpression.type === 'StringLiteral') {
      var moduleName = (0, _moduleImportHelper.getImportModuleName)(this.file, this.importedModuleExpression.value);
      this.moduleNameExpression = _babelArgumentProvider.types.stringLiteral(moduleName); // for AMD and Global when configured
    }
  }

  _createClass(SystemImportExpressionTransformer, [{
    key: 'getGlobalIdentifier',
    value: function getGlobalIdentifier() {
      if (this.globalIdentifier) {
        return this.globalIdentifier;
      }
      this.globalIdentifier = new _utils.UtilsHelper(this.file).getGlobalIdentifier();
      return this.globalIdentifier;
    }
  }, {
    key: 'getAmdTest',
    value: function getAmdTest() {
      var globalIdentifier = this.getGlobalIdentifier();
      // typeof global.define === 'function' && global.define.amd
      var amdTest = _babelArgumentProvider.types.logicalExpression('&&', _babelArgumentProvider.types.binaryExpression('===', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.memberExpression(globalIdentifier, _babelArgumentProvider.types.identifier('define'))), _babelArgumentProvider.types.stringLiteral('function')), _babelArgumentProvider.types.memberExpression(_babelArgumentProvider.types.memberExpression(globalIdentifier, _babelArgumentProvider.types.identifier('define')), _babelArgumentProvider.types.identifier('amd')));
      return amdTest;
    }
  }, {
    key: 'getAmdRequirePromise',
    value: function getAmdRequirePromise(module) {
      var globalIdentifier = this.getGlobalIdentifier();
      // global.require(['localforageSerializer'], resolve, reject);
      var amdRequire = _babelArgumentProvider.types.expressionStatement(_babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.memberExpression(globalIdentifier, _babelArgumentProvider.types.identifier('require')), [_babelArgumentProvider.types.arrayExpression([module]), _babelArgumentProvider.types.identifier('resolve'), _babelArgumentProvider.types.identifier('reject')]));

      var newPromiseExpression = _babelArgumentProvider.types.newExpression(_babelArgumentProvider.types.identifier('Promise'), [_babelArgumentProvider.types.functionExpression(null, [_babelArgumentProvider.types.identifier('resolve'), _babelArgumentProvider.types.identifier('reject')], _babelArgumentProvider.types.blockStatement([amdRequire]))]);
      return newPromiseExpression;
    }
  }, {
    key: 'getCommonJSTest',
    value: function getCommonJSTest() {
      // typeof module !== 'undefined' && module.exports && typeof require !== 'undefined'
      var commonJSTest = _babelArgumentProvider.types.logicalExpression('&&', _babelArgumentProvider.types.binaryExpression('!==', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.identifier('module')), _babelArgumentProvider.types.stringLiteral('undefined')), _babelArgumentProvider.types.logicalExpression('&&', _babelArgumentProvider.types.memberExpression(_babelArgumentProvider.types.identifier('module'), _babelArgumentProvider.types.identifier('exports')), _babelArgumentProvider.types.binaryExpression('!==', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.identifier('require')), _babelArgumentProvider.types.stringLiteral('undefined'))));
      return commonJSTest;
    }
  }, {
    key: 'getComponentTest',
    value: function getComponentTest() {
      var globalIdentifier = this.getGlobalIdentifier();
      // typeof module !== 'undefined' && module.component && global.require && global.require.loader === 'component'
      var componentTest = _babelArgumentProvider.types.logicalExpression('&&', _babelArgumentProvider.types.binaryExpression('!==', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.identifier('module')), _babelArgumentProvider.types.stringLiteral('undefined')), _babelArgumentProvider.types.logicalExpression('&&', _babelArgumentProvider.types.memberExpression(_babelArgumentProvider.types.identifier('module'), _babelArgumentProvider.types.identifier('component')), _babelArgumentProvider.types.logicalExpression('&&', _babelArgumentProvider.types.memberExpression(globalIdentifier, _babelArgumentProvider.types.identifier('require')), _babelArgumentProvider.types.binaryExpression('===', _babelArgumentProvider.types.memberExpression(_babelArgumentProvider.types.memberExpression(globalIdentifier, _babelArgumentProvider.types.identifier('require')), _babelArgumentProvider.types.identifier('loader')), _babelArgumentProvider.types.stringLiteral('component')))));
      return componentTest;
    }
  }, {
    key: 'getCommonJSRequire',
    value: function getCommonJSRequire(module) {
      // resolve(require('./../utils/serializer'));

      var commonJSRequireExpression = _babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.identifier('require'),
      // [module] // why this isn't working???
      // [module, t.identifier('undefined')] // had to add extra undefined parameter or parenthesis !?!?!?
      [_babelArgumentProvider.types.parenthesizedExpression(module)]);
      return commonJSRequireExpression;
    }
  }, {
    key: 'getCommonJSRequirePromise',
    value: function getCommonJSRequirePromise(module) {
      if (this.pluginOptions.commonJS && this.pluginOptions.commonJS.useRequireEnsure) {
        return this.getCommonJSRequireEnsurePromise(module);
      }
      return this.getCommonJSPlainRequirePromise(module);
    }
  }, {
    key: 'getCommonJSPlainRequirePromise',
    value: function getCommonJSPlainRequirePromise(module) {
      var commonJSRequireExpression = this.getCommonJSRequire(module);
      var commonJSRequire = (0, _promiseUtils.createPromiseResolveExpression)(commonJSRequireExpression);
      return commonJSRequire;
    }
  }, {
    key: 'getCommonJSRequireEnsurePromise',
    value: function getCommonJSRequireEnsurePromise(module) {
      // require.ensure([], function(require) { resolve(require(module)); });
      var requireEnsure = _babelArgumentProvider.types.expressionStatement(_babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.memberExpression(_babelArgumentProvider.types.identifier('require'), _babelArgumentProvider.types.identifier('ensure')), [_babelArgumentProvider.types.arrayExpression([]), _babelArgumentProvider.types.functionExpression(null, [_babelArgumentProvider.types.identifier('require')], _babelArgumentProvider.types.blockStatement([_babelArgumentProvider.types.expressionStatement(_babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.identifier('resolve'), [_babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.identifier('require'), [module])]))]))]));

      var newPromiseExpression = _babelArgumentProvider.types.newExpression(_babelArgumentProvider.types.identifier('Promise'), [_babelArgumentProvider.types.functionExpression(null, [_babelArgumentProvider.types.identifier('resolve')], _babelArgumentProvider.types.blockStatement([requireEnsure]))]);
      return newPromiseExpression;
    }
  }, {
    key: 'getGlobalRequire',
    value: function getGlobalRequire(module) {
      var globalIdentifier = this.getGlobalIdentifier();

      // resolve(global.localforageSerializer);
      var globalMemberExpression = _babelArgumentProvider.types.memberExpression(globalIdentifier, module, true // computed
      );
      return globalMemberExpression;
    }
  }, {
    key: 'getGlobalRequirePromise',
    value: function getGlobalRequirePromise(module) {
      var globalMemberExpression = this.getGlobalRequire(module);
      var globalRequire = (0, _promiseUtils.createPromiseResolveExpression)(globalMemberExpression);
      return globalRequire;
    }
  }, {
    key: 'createTransformedExpression',
    value: function createTransformedExpression() {
      var moduleImportExpression;
      if (this.moduleType === 'amd') {
        moduleImportExpression = this.getAmdRequirePromise(this.moduleNameExpression);
      } else if (this.moduleType === 'common') {
        moduleImportExpression = this.getCommonJSRequirePromise(this.importedModuleExpression);
      } else if (this.moduleType === 'global') {
        moduleImportExpression = this.getGlobalRequirePromise(this.moduleNameExpression);
      } else {
        // umd
        var amdTest = this.getAmdTest();
        var commonJSTest = this.getCommonJSTest();
        var componentTest = this.getComponentTest();
        var commonJSOrComponentTest = _babelArgumentProvider.types.logicalExpression('||', commonJSTest, componentTest);

        var umdRequire = _babelArgumentProvider.types.conditionalExpression(amdTest, this.getAmdRequirePromise(this.moduleNameExpression), _babelArgumentProvider.types.conditionalExpression(commonJSOrComponentTest, this.getCommonJSRequirePromise(this.importedModuleExpression), this.getGlobalRequirePromise(this.moduleNameExpression)));
        moduleImportExpression = umdRequire;
      }

      return moduleImportExpression;
    }
  }]);

  return SystemImportExpressionTransformer;
}();

exports.default = SystemImportExpressionTransformer;