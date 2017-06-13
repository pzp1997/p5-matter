# html-void-elements [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

List of known void HTML elements.  Includes ancient (for example,
`nextid` and `basefont`) and modern (for example, `img` and
`meta`) tag-names from both W3C and WHATWG.

**Note**: there’s one special case: `menuitem`.  W3C specifies it to be
void, but WHATWG doesn’t.  I suggest using the void form.

## Installation

[npm][]:

```bash
npm install html-void-elements
```

**html-void-elements** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var htmlVoidElements = require('html-void-elements');
```

Yields:

```js
[ 'area',
  'base',
  'basefont',
  'bgsound',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'image',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'nextid',
  'param',
  'source',
  'track',
  'wbr' ]
```

## API

### `htmlVoidElements`

`Array.<string>` — List of lower-case tag-names.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/html-void-elements.svg

[build-page]: https://travis-ci.org/wooorm/html-void-elements

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/html-void-elements.svg

[coverage-page]: https://codecov.io/github/wooorm/html-void-elements?branch=master

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/html-void-elements/releases

[license]: LICENSE

[author]: http://wooorm.com
