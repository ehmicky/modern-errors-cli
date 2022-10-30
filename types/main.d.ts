import type { Options } from 'handle-cli-error'

import type { Info } from 'modern-errors'

/**
 * Options of `modern-errors-cli`
 */
export type { Options }

/**
 * `modern-errors-cli` plugin
 */
declare const plugin: {
  name: 'cli'
  getOptions: (input: Options) => Options
  instanceMethods: {
    /**
     * Logs `error` on the console (`stderr`) then exits the process.
     *
     * This never throws. Invalid errors are silently
     * [normalized](https://github.com/ehmicky/normalize-exception).
     *
     * @example
     * ```js
     * const cliMain = function () {
     *   try {
     *     // ...
     *   } catch (error) {
     *     // Ensure `error` is an `Error` instance
     *     const normalizedError = AnyError.normalize(error)
     *     // Logs `error` then exits the process
     *     normalizedError.exit()
     *   }
     * }
     *
     * cliMain()
     * ```
     */
    exit: (info: Info['instanceMethods']) => void
  }
}
export default plugin
