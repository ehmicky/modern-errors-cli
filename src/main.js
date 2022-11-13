import handleCliError, { validateOptions } from 'handle-cli-error'

const getOptions = function (options = {}) {
  validateOptions(options)

  if (options.classes !== undefined) {
    throw new TypeError(`"classes" must not be defined: ${options.classes}`)
  }

  return options
}

// Stack traces and error properties are displayed by default.
const exit = function ({ error, options: { stack = true, ...options } }) {
  handleCliError(error, { ...options, stack })
}

export default {
  name: 'cli',
  getOptions,
  instanceMethods: { exit },
}
