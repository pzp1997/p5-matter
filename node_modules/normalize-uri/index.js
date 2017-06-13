'use strict';

module.exports = returner;

try {
  normalize('');
  module.exports = normalize;
} catch (err) {}

/* Normalize `uri`. */
function normalize(uri) {
  return encodeURI(decodeURI(uri));
}

/* istanbul ignore next - Fallback, return input. */
function returner(uri) {
  return uri;
}
