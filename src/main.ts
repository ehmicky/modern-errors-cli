import beautifulError from 'beautiful-error'
import handleCliError, {
  validateOptions,
  type Options as HandleCliErrorOptions,
} from 'handle-cli-error'
import type { ErrorInstance, Info, Plugin } from 'modern-errors'

/**
 * Options of `modern-errors-cli`
 */
export type Options = Omit<HandleCliErrorOptions, 'classes' | 'custom'>

// `error.pretty()` is called with `errorString` as argument by
// `beautiful-error`. We ignore that argument and prevent it from being
// considered an invalid options object.
const isOptions = (options: unknown) => typeof options !== 'string'

const getOptions = (options: Options = {}) => {
  validateOptions(options)

  if (options.classes !== undefined) {
    throw new TypeError('The "classes" option must not be defined.')
  }

  if (options.custom !== undefined) {
    throw new TypeError('The "custom" option must not be defined.')
  }

  return { ...options, custom: 'pretty' }
}

/**
 * Logs `error` on the console (`stderr`) then exits the process.
 *
 * This never throws. Invalid errors are silently
 * [normalized](https://github.com/ehmicky/normalize-exception).
 *
 * @example
 * ```js
 * const cliMain = () => {
 *   try {
 *     // ...
 *   } catch (error) {
 *     // Logs `error` then exits the process
 *     BaseError.exit(error)
 *   }
 * }
 *
 * cliMain()
 * ```
 */
const exit = ({ error, options }: Info<Options>['instanceMethods']) => {
  removePretty(error)

  try {
    handleCliError(error, options)
  } finally {
    restorePretty(error)
  }
}

// Uses `.pretty()` to avoid conflict with `modern-errors-beautiful`.
// Temporarily unsets `error.pretty()` to avoid recursion.
// This is a workaround to support nested errors and is not documented.
const pretty = ({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: { exitCode, silent, timeout, log, ...beautifulErrorOptions },
}: Info<Options>['instanceMethods']) => {
  removePretty(error)

  try {
    return beautifulError(error, beautifulErrorOptions)
  } finally {
    restorePretty(error)
  }
}

const removePretty = (error: ErrorInstance) => {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, 'pretty', {
    value: undefined,
    enumerable: false,
    writable: true,
    configurable: true,
  })
}

const restorePretty = (error: ErrorInstance & { pretty?: undefined }) => {
  // eslint-disable-next-line fp/no-delete
  delete error.pretty
}

/**
 * `modern-errors-cli` plugin
 */
const modernErrorsCli = {
  name: 'cli' as const,
  isOptions,
  getOptions,
  instanceMethods: { exit, pretty },
} satisfies Plugin

export default modernErrorsCli
