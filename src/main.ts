import beautifulError from 'beautiful-error'
import handleCliError, {
  validateOptions,
  type Options as HandleCliErrorOptions,
} from 'handle-cli-error'
import type { Info, Plugin } from 'modern-errors'

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

  return options
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
  handleCliError(error, { ...options, custom: 'pretty' })
}

// Uses `.pretty()` to avoid conflict with `modern-errors-beautiful`.
// Temporarily unsets `error.pretty()` to avoid recursion.
const pretty = ({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: { exitCode, silent, timeout, log, ...beautifulErrorOptions },
}: Info<Options>['instanceMethods']) => {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, 'pretty', {
    value: undefined,
    enumerable: false,
    writable: true,
    configurable: true,
  })

  try {
    return beautifulError(error, beautifulErrorOptions)
  } finally {
    // eslint-disable-next-line fp/no-delete
    delete (error as Error & { pretty?: undefined }).pretty
  }
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
