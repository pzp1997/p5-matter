/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module vfile-sort
 * @fileoverview Sort vfile messages by line/column.
 */

'use strict';

/* Expose. */
module.exports = sort;

/* Sort all `file`s messages by line/column. */
function sort(file) {
  file.messages.sort(comparator);
  return file;
}

/* Comparator. */
function comparator(a, b) {
  return check(a, b, 'line') || check(a, b, 'column') || -1;
}

/* Compare a single property. */
function check(a, b, property) {
  return (a[property] || 0) - (b[property] || 0);
}
