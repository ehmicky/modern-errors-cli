import ModernError from 'modern-errors'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

import modernErrorsCli, { type Options } from 'modern-errors-cli'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsCli],
})
const error = new BaseError('')
expectType<void>(BaseError.exit(error))

ModernError.subclass('TestError', { plugins: [modernErrorsCli], cli: {} })
BaseError.exit(error, {})
expectAssignable<Options>({})
BaseError.exit(error, undefined)
expectNotAssignable<Options>(undefined)
// @ts-expect-error
ModernError.subclass('TestError', { plugins: [modernErrorsCli], cli: true })
// @ts-expect-error
BaseError.exit(error, true)
expectNotAssignable<Options>(true)
ModernError.subclass('TestError', {
  plugins: [modernErrorsCli],
  // @ts-expect-error
  cli: { unknown: true },
})
// @ts-expect-error
BaseError.exit(error, { unknown: true })
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', {
  plugins: [modernErrorsCli],
  cli: { silent: true },
})
BaseError.exit(error, { silent: true })
expectAssignable<Options>({ silent: true })
ModernError.subclass('TestError', {
  plugins: [modernErrorsCli],
  // @ts-expect-error
  cli: { silent: 'true' },
})
// @ts-expect-error
BaseError.exit(error, { silent: 'true' })
expectNotAssignable<Options>({ silent: 'true' })
