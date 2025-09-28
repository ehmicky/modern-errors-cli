# 6.0.0

## Breaking changes

- Previously, if the [`props`](README.md#-props) option was `false`,
  [aggregate errors](https://github.com/ehmicky/modern-errors#aggregate-errors)
  were not printed. To achieve the same behavior, the
  [`cause`](README.md#-cause) option must now be set to `false`.

## Features

- Aggregate errors are now printed on their own, which result in a prettier
  output.

# 5.2.0

## Features

- Add option [`log`](README.md#-log) to customize printing the error message.

# 5.1.0

## Features

- Allow [exit codes](README.md#-exitcode) from 125 to 255.

# 5.0.1

## Documentation

- Improve documentation in `README.md`

# 5.0.0

## Breaking changes

- Minimal supported Node.js version is now `18.18.0`

# 4.0.0

## Breaking changes

- Minimal supported `modern-errors` version is now `6.0.0`

# 3.0.0

## Breaking changes

- Minimal supported Node.js version is now `16.17.0`

# 2.3.0

## Features

- Migrate to TypeScript

# 2.2.0

## Features

- `error.exit()` has been renamed to
  [`BaseError.exit(error)`](README.md#baseerrorexiterror). `error.exit()` is
  deprecated but still supported.

# 2.1.0

## Features

- Upgrade to the latest version of `modern-errors`

# 2.0.0

## Breaking changes

- [`modern-errors@5`](https://github.com/ehmicky/modern-errors/releases/tag/5.0.0)
  is now required
- The default value for the [`exitCode` option](README.md#-exitcode) is now `1`

# 1.4.0

## Features

- Improve tree-shaking support

# 1.3.2

## Bug fixes

- Fix `stack` option's default value

# 1.3.1

## Types

- Fix bug with TypeScript types

# 1.3.0

## Features

- Upgrade to
  [`modern-errors@v4`](https://github.com/ehmicky/modern-errors/releases/tag/4.0.0)

# 1.2.0

## Documentation

Improve `README`

# 1.1.0

## Documentation

Improve `README` and add a logo

# 1.0.3

## Bug fixes

Fix `package.json`

# 1.0.2

## Bug fixes

Fix `package.json`

# 1.0.1

## Bug fixes

Fix `package.json`

# 1.0.0

Initial release.
