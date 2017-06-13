/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module detab
 * @fileoverview Detab: tabs -> spaces.
 */

'use strict';

/* Expose. */
module.exports = detab;

/* Dependencies. */
var repeat = require('repeat-string');

/* Constants. */
var TAB = 0x09;
var LF = 0x0a;
var CR = 0x0d;

/**
 * Replace tabs with spaces, being smart about which
 * column the tab is at and which size should be used.
 *
 * @param {string} value - Value with tabs.
 * @param {number?} [size=4] - Tab-size.
 * @return {string} - Value without tabs.
 */
function detab(value, size) {
  var string = typeof value === 'string';
  var length = string && value.length;
  var start = 0;
  var index = -1;
  var column = -1;
  var tabSize = size || 4;
  var results = [];
  var code;
  var add;

  if (!string) {
    throw new Error('detab expected string');
  }

  while (++index < length) {
    code = value.charCodeAt(index);

    if (code === TAB) {
      add = tabSize - ((column + 1) % tabSize);
      column += add;
      results.push(value.slice(start, index) + repeat(' ', add));
      start = index + 1;
    } else if (code === LF || code === CR) {
      column = -1;
    } else {
      column++;
    }
  }

  results.push(value.slice(start));

  return results.join('');
}
