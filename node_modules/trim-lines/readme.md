# trim-lines [![Build Status][travtrim-lines]][travis] [![Coverage Status][codecov-badge]][codecov]

Remove spaces and tabs around line-breaks.

## Installation

[npm][]:

```bash
npm install trim-lines
```

## Usage

```js
var trimLines = require('trim-lines');

trimLines(' foo\t\n\n bar \n\tbaz '); //=> ' foo\nbar\nbaz '
```

## API

### `trimLines(value)`

Remove initial and final spaces and tabs at the line breaks in `value`.  Does
not trim initial and final spaces and tabs of the value itself.

###### Parameters

*   `value` (`string`) — Value with untrimmed line breaks, coerced to string.

###### Returns

`string` — Value with trimmed line breaks.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travtrim-lines]: https://img.shields.io/travis/wooorm/trim-lines.svg

[travis]: https://travis-ci.org/wooorm/trim-lines

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/trim-lines.svg

[codecov]: https://codecov.io/github/wooorm/trim-lines

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com
