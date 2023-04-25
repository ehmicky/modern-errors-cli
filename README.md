<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/modern-errors/modern-errors_dark.svg"/>
  <img alt="modern-errors logo" src="https://raw.githubusercontent.com/ehmicky/design/main/modern-errors/modern-errors.svg" width="600"/>
</picture>

[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/modern-errors-cli)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/modern-errors-cli)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

[`modern-errors`](https://github.com/ehmicky/modern-errors)
[plugin](https://github.com/ehmicky/modern-errors#-plugins) to handle errors in
CLI modules.

This adds [`BaseError.exit(error)`](#baseerrorexiterror) which logs `error` then
exits the process.

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

[Adding the plugin](https://github.com/ehmicky/modern-errors#adding-plugins) to
[`modern-errors`](https://github.com/ehmicky/modern-errors).

```js
import ModernError from 'modern-errors'

import modernErrorsCli from 'modern-errors-cli'

export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsCli],
})
// ...
```

Calling [`BaseError.exit(error)`](#baseerrorexiterror) in the CLI's top-level
error handler.

```js
const cliMain = () => {
  try {
    // ...
  } catch (error) {
    // Logs `error` then exits the process
    BaseError.exit(error)
  }
}

cliMain()
```

# Install

```bash
npm install modern-errors-cli
```

This package requires Node.js >=14.18.0.

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# API

## modernErrorsCli

_Type_: `Plugin`

Plugin object to pass to the
[`plugins` option](https://github.com/ehmicky/modern-errors#adding-plugins) of
`ErrorClass.subclass()`.

## BaseError.exit(error)

`error`: `any`

Logs `error` on the console (`stderr`) then exits the process.

This never throws. Invalid errors are silently
[normalized](https://github.com/ehmicky/normalize-exception).

## Options

_Type_: `object`

### 🚨 exitCode

_Type_: `integer`\
_Default_: `1`

Process [exit code](https://en.wikipedia.org/wiki/Exit_status).

Note: when passing invalid `options`, the exit code is always `125`.

### 📕 stack

_Type_: `boolean`\
_Default_: `true`

Whether to log the error's stack trace.

### 📢 props

_Type_: `boolean`\
_Default_: `true`

Whether to log the error's additional properties.

### 🔕 silent

_Type_: `boolean`\
_Default_: `false`

Exits the process without logging anything on the console.

### 🖍️ colors

_Type_: `boolean`\
_Default_: `true` in terminals, `false` otherwise

Whether to colorize the error's message, stack trace and additional properties.

Quoted strings in the error's message are printed in bold (for `"..."` and
`'...'`) and in italic (for `` `...` ``).

### ❌ icon

_Type_: `string`\
_Default_: `'cross'`

Icon prepended to the error's name. The available values are listed
[here](https://github.com/sindresorhus/figures/blob/main/readme.md#figures-1).
Can be disabled by passing an empty string.

### 💄 header

_Type_: `string`\
_Default_: `'red bold'`

Color/style of the error's [icon](#-icon) and name. The available values are
listed [here](https://github.com/ehmicky/chalk-string#available-styles). Several
styles can be specified by using spaces. Can be disabled by passing an empty
string.

### 🚒 timeout

_Type_: `integer` (in milliseconds)\
_Default_: `5000` (5 seconds)

The process exits gracefully: it waits for any ongoing tasks (callbacks,
promises, etc.) to complete, up to a specific `timeout`.

Special values:

- `0`: Exits right away, without waiting for ongoing tasks
- `Number.POSITIVE_INFINITY`: Waits for ongoing tasks forever, without timing
  out

## Configuration

[Options](#options) can apply to (in priority order):

- Any error: second argument to
  [`ModernError.subclass()`](https://github.com/ehmicky/modern-errors#options-1)

```js
export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsCli],
  cli: options,
})
```

- Any error of a specific class (and its subclasses): second argument to
  [`ErrorClass.subclass()`](https://github.com/ehmicky/modern-errors#options-1)

```js
export const InputError = BaseError.subclass('InputError', { cli: options })
```

- A specific error: second argument to
  [`new ErrorClass()`](https://github.com/ehmicky/modern-errors#options-3)

```js
throw new InputError('...', { cli: options })
```

- A specific [`BaseError.exit(error)`](#baseerrorexiterror) call

```js
BaseError.exit(error, options)
```

# Related projects

- [`handle-cli-error`](https://github.com/ehmicky/handle-cli-error): 💣 Error
  handler for CLI applications 💥
- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors in
  a simple, stable, consistent way
- [`modern-errors-process`](https://github.com/ehmicky/modern-errors-process):
  Handle process errors
- [`modern-errors-bugs`](https://github.com/ehmicky/modern-errors-bugs): Print
  where to report bugs
- [`modern-errors-serialize`](https://github.com/ehmicky/modern-errors-serialize):
  Serialize/parse errors
- [`modern-errors-clean`](https://github.com/ehmicky/modern-errors-clean): Clean
  stack traces
- [`modern-errors-http`](https://github.com/ehmicky/modern-errors-http): Create
  HTTP error responses
- [`modern-errors-winston`](https://github.com/ehmicky/modern-errors-winston):
  Log errors with Winston
- [`modern-errors-switch`](https://github.com/ehmicky/modern-errors-switch):
  Execute class-specific logic

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
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/modern-errors-cli/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/modern-errors-cli/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
