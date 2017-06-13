'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (babel) {
  return {
    inherits: _babelPluginSyntaxDynamicImport2.default,

    visitor: {
      CallExpression: function CallExpression(path, state) {
        var callee = path.get('callee');
        if (!callee) {
          return;
        }

        var pluginOptions = state.opts || {};
        var syntax = pluginOptions.syntax || {};

        if (syntax["system-import"] !== false && callee.matchesPattern(PATTERN_SYSTEM_IMPORT) || syntax.import !== false && callee.type === TYPE_IMPORT) {
          var params = path.get('arguments');
          if (params.length) {
            (0, _babelArgumentProvider.setBabelArgument)(babel);
            var transformer = new _SystemImportExpressionTransformer2.default(state, params);
            var transformedExpression = transformer.createTransformedExpression();
            if (transformedExpression) {
              path.replaceWith(transformedExpression);
            }
          }
        }
      }
    }
  };
};

var _babelPluginSyntaxDynamicImport = require('babel-plugin-syntax-dynamic-import');

var _babelPluginSyntaxDynamicImport2 = _interopRequireDefault(_babelPluginSyntaxDynamicImport);

var _babelArgumentProvider = require('./babelArgumentProvider');

var _SystemImportExpressionTransformer = require('./SystemImportExpressionTransformer');

var _SystemImportExpressionTransformer2 = _interopRequireDefault(_SystemImportExpressionTransformer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATTERN_SYSTEM_IMPORT = 'System.import';
var TYPE_IMPORT = 'Import';