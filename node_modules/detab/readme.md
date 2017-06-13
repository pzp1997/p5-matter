# detab [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Detab: tabs -> spaces.

## Installation

[npm][npm-install]:

```bash
npm install detab
```

## Usage

Dependencies.

```javascript
var detab = require('detab');
```

Detab:

```javascript
var four = detab('\tfoo\nbar\tbaz');
var two = detab('\tfoo\nbar\tbaz', 2);
var eight = detab('\tfoo\nbar\tbaz', 8);
```

Yields:

```text
    foo
bar baz
```

```text
  foo
bar baz
```

```text
        foo
bar     baz
```

## API

### `detab(value[, size=4])`

Replace tabs with spaces, being smart about which column the tab is at
and which size should be used.

###### Parameters

*   `value` (`string`) — Value with tabs;
*   `size` (`number`, default: `4`) — Tab-size.

###### Returns

`string` — Value without tabs

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/detab.svg

[travis]: https://travis-ci.org/wooorm/detab

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/detab.svg

[codecov]: https://codecov.io/github/wooorm/detab

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com
