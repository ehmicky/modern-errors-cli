import handleCliError, { validateOptions } from 'handle-cli-error'

const getOptions = function (options = {}) {
  validateOptions(options)

  if (options.classes !== undefined) {
    throw new TypeError(`"classes" must not be defined: ${options.classes}`)
  }

  return options
}

// The default value of `exitCode` is 1 for the first declared class, then
// incrementing from there.
//  - If some of the classes define their `exitCode`, it does not change the
//    default `exitCode` of others
// Stack traces and error properties are displayed by default.
const exit = function ({
  ErrorClasses,
  error,
  options: {
    stack = true,
    exitCode = Object.keys(ErrorClasses).indexOf(error.name) + 1,
    ...options
  },
}) {
  handleCliError(error, { ...options, stack, exitCode })
}

export default {
  name: 'cli',
  getOptions,
  instanceMethods: { exit },
}
