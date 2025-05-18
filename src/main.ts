import handleCliError, { validateOptions, type Options } from 'handle-cli-error'
import type { Info, Plugin } from 'modern-errors'

/**
 * Options of `modern-errors-cli`
 */
export type { Options }

const getOptions = (options: Options = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  validateOptions(options)

  if (options.classes !== undefined) {
    throw new TypeError('"classes" must not be defined.')
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
  handleCliError(error, options)
}

/**
 * `modern-errors-cli` plugin
 */
const modernErrorsCli = {
  name: 'cli' as const,
  getOptions,
  instanceMethods: { exit },
} satisfies Plugin

export default modernErrorsCli
