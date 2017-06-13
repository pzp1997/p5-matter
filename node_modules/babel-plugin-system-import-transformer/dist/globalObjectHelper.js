'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalObjectExpression = getGlobalObjectExpression;

var _babelArgumentProvider = require('./babelArgumentProvider');

function getGlobalObjectExpression() {
  return _babelArgumentProvider.types.conditionalExpression(_babelArgumentProvider.types.binaryExpression('!==', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.identifier('window')), _babelArgumentProvider.types.stringLiteral('undefined')), _babelArgumentProvider.types.identifier('window'), _babelArgumentProvider.types.conditionalExpression(_babelArgumentProvider.types.binaryExpression('!==', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.identifier('self')), _babelArgumentProvider.types.stringLiteral('undefined')), _babelArgumentProvider.types.identifier('self'), _babelArgumentProvider.types.conditionalExpression(_babelArgumentProvider.types.binaryExpression('!==', _babelArgumentProvider.types.unaryExpression('typeof', _babelArgumentProvider.types.identifier('global')), _babelArgumentProvider.types.stringLiteral('undefined')), _babelArgumentProvider.types.identifier('global'), _babelArgumentProvider.types.objectExpression([]))));
}