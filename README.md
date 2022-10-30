[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/modern-errors-cli.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/modern-errors-cli)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/types/main.d.ts)
[![Node](https://img.shields.io/node/v/modern-errors-cli.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/modern-errors-cli)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

`modern-errors` plugin to handle errors in CLI modules.

# Features

- 🖍️ Pretty [colors](#%EF%B8%8F-colors), [icons](#-icon) and [header](#-header)
- 🚒 [Graceful exit](#-timeout)
- ⛑️ [Normalize](https://github.com/ehmicky/normalize-exception) invalid errors
- 🔕 Log verbosity: [message](#-silent), [stack](#-stack), [properties](#-props)
- 🚨 Custom [exit code](#-exitcode)
- 💥 Exception-safe

# Screenshot

<img alt="modern-errors-cli screenshot" src="https://raw.githubusercontent.com/ehmicky/handle-cli-error/main/docs/screenshot.png" width="500"/>

# Example

Add the plugin to `modern-errors`.

```js
// `errors.js`
import modernErrors from 'modern-errors'
import modernErrorsCli from 'modern-errors-cli'

export const AnyError = modernErrors([modernErrorsCli])
// ...
```

Handle errors in the CLI main file.

```js
#!/usr/bin/env node
import { AnyError } from './errors.js'

const cliMain = function () {
  try {
    // ...
  } catch (error) {
    const normalizedError = AnyError.normalize(error)
    normalizedError.exit() // Logs `error` then exit the process
  }
}

cliMain()
```

# Install

```bash
npm install modern-errors-cli
```

This package requires Node.js. It is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## modernErrorsCli

_Type_: `Plugin`

Plugin object to
[pass to `modernErrors()`](https://github.com/ehmicky/modern-errors#adding-plugins).

## error.exit(options?)

`options` [`Options?`](#options)\
_Return value_: `void`

Logs `error` on the console (`stderr`) then exits the process.

This never throws. Invalid errors are silently
[normalized](https://github.com/ehmicky/normalize-exception).

### Options

#### 🚨 exitCode

_Type_: `integer`

Process [exit code](https://en.wikipedia.org/wiki/Exit_status).

By default, each error class has its own exit code: `1` for the first one
declared, `2` for the next one, and so on.

#### 📕 stack

_Type_: `boolean`

Whether to log the error's stack trace.

By default, this is `true` if the error (or one of its
[inner](https://github.com/ehmicky/modern-errors/README.md#wrap-errors) errors)
is
[_unknown_](https://github.com/ehmicky/modern-errors/README.md#unknown-errors),
and `false` otherwise.

#### 📢 props

_Type_: `boolean`\
_Default_: `true`

Whether to log the error's additional properties.

#### 🔕 silent

_Type_: `boolean`\
_Default_: `false`

Exits the process without logging anything on the console.

#### 🖍️ colors

_Type_: `boolean`\
_Default_: `true` in terminals, `false` otherwise

Whether to colorize the error's message, stack trace and additional properties.

Quoted strings in the error's message are printed in bold (for `"..."` and
`'...'`) and in italic (for `` `...` ``).

#### ❌ icon

_Type_: `string`\
_Default_: `'cross'`

Icon prepended to the error's name. The available values are listed
[here](https://github.com/sindresorhus/figures/blob/main/readme.md#figures-1).
Can be disabled by passing an empty string.

#### 💄 header

_Type_: `string`\
_Default_: `'red bold'`

Color/style of the error's [icon](#-icon) and name. The available values are
listed [here](https://github.com/ehmicky/chalk-string#available-styles). Several
styles can be specified by using spaces. Can be disabled by passing an empty
string.

#### 🚒 timeout

_Type_: `integer` (in milliseconds)\
_Default_: `5000` (5 seconds)

The process exits gracefully: it waits for any ongoing tasks (callbacks,
promises, etc.) to complete, up to a specific `timeout`.

Special values:

- `0`: Exits right away, without waiting for ongoing tasks
- `Number.POSITIVE_INFINITY`: Waits for ongoing tasks forever, without timing
  out

# Related projects

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/modern-errors-cli/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/modern-errors-cli/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
