'use strict';

exports.parse = parse;
exports.stringify = stringify;

var trim = require('trim');

var C_COMMA = ',';
var C_SPACE = ' ';
var EMPTY = '';

/* Parse comma-separated tokens to an array. */
function parse(value) {
  var values = [];
  var input = String(value || EMPTY);
  var index = input.indexOf(C_COMMA);
  var lastIndex = 0;
  var end = false;
  var val;

  while (!end) {
    if (index === -1) {
      index = input.length;
      end = true;
    }

    val = trim(input.slice(lastIndex, index));

    if (val || !end) {
      values.push(val);
    }

    lastIndex = index + 1;
    index = input.indexOf(C_COMMA, lastIndex);
  }

  return values;
}

/* Compile an array to comma-separated tokens.
 * `options.padLeft` (default: `true`) pads a space left of each
 * token, and `options.padRight` (default: `false`) pads a space
 * to the right of each token. */
function stringify(values, options) {
  var settings = options || {};
  var left = settings.padLeft;

  /* Ensure the last empty entry is seen. */
  if (values[values.length - 1] === EMPTY) {
    values = values.concat(EMPTY);
  }

  return trim(values.join(
    (settings.padRight ? C_SPACE : EMPTY) +
    C_COMMA +
    (left || left === undefined || left === null ? C_SPACE : EMPTY)
  ));
}
