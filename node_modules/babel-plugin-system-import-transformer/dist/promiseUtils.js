'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createResolveExpressionStatement = createResolveExpressionStatement;
exports.createPromiseResolveExpression = createPromiseResolveExpression;

var _babelArgumentProvider = require('./babelArgumentProvider');

function createResolveExpressionStatement(parameter) {
  var result = _babelArgumentProvider.types.expressionStatement(_babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.identifier('resolve'), [parameter]));
  return result;
}

function createPromiseResolveExpression(parameter) {
  var result = _babelArgumentProvider.types.callExpression(_babelArgumentProvider.types.memberExpression(_babelArgumentProvider.types.identifier('Promise'), _babelArgumentProvider.types.identifier('resolve')), [parameter]);
  return result;
}