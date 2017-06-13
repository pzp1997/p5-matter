'use strict';

var trim = require('trim');

exports.parse = parse;
exports.stringify = stringify;

var empty = '';
var space = ' ';
var whiteSpace = /[ \t\n\r\f]+/g;

function parse(value) {
  var input = trim(String(value || empty));

  if (input === empty) {
    return [];
  }

  return input.split(whiteSpace);
}

function stringify(values) {
  return trim(values.join(space));
}
