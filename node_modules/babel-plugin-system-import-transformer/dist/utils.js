'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilsHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _babelArgumentProvider = require('./babelArgumentProvider');

var _globalObjectHelper = require('./globalObjectHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilsHelper = exports.UtilsHelper = function () {
  function UtilsHelper(file) {
    _classCallCheck(this, UtilsHelper);

    this.file = file;
  }

  _createClass(UtilsHelper, [{
    key: 'getGlobalIdentifier',
    value: function getGlobalIdentifier() {
      var name = 'system-import-transformer-global-identifier';
      var result = this.getOrCreateHelper(name, function () {
        return (0, _globalObjectHelper.getGlobalObjectExpression)();
      });
      return result;
    }
  }, {
    key: 'getOrCreateHelper',
    value: function getOrCreateHelper(name, ref) {
      var declar = this.file.declarations[name];
      if (declar) {
        return declar;
      }

      var uid = this.file.declarations[name] = this.file.scope.generateUidIdentifier(name);
      this.file.usedHelpers[name] = true;

      if (typeof ref === 'function') {
        ref = ref();
      }

      if (_babelArgumentProvider.types.isFunctionExpression(ref) && !ref.id) {
        ref.body._compact = true;
        ref._generated = true;
        ref.id = uid;
        ref.type = "FunctionDeclaration";
        this.file.attachAuxiliaryComment(ref);
        this.file.path.unshiftContainer("body", ref);
      } else {
        ref._compact = true;
        this.file.scope.push({
          id: uid,
          init: ref,
          unique: true
        });
      }

      return uid;
    }
  }]);

  return UtilsHelper;
}();