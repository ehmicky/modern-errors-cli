import ModernError from 'modern-errors'
import modernErrorsCli, { Options } from 'modern-errors-cli'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsCli],
})
const error = new BaseError('')
expectType<void>(BaseError.exit(error))

ModernError.subclass('TestError', { plugins: [modernErrorsCli], cli: {} })
BaseError.exit(error, {})
expectAssignable<Options>({})
expectError(BaseError.exit(error, undefined))
expectNotAssignable<Options>(undefined)
expectError(
  ModernError.subclass('TestError', { plugins: [modernErrorsCli], cli: true }),
)
expectError(BaseError.exit(error, true))
expectNotAssignable<Options>(true)
expectError(
  ModernError.subclass('TestError', {
    plugins: [modernErrorsCli],
    cli: { unknown: true },
  }),
)
expectError(BaseError.exit(error, { unknown: true }))
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', {
  plugins: [modernErrorsCli],
  cli: { silent: true },
})
BaseError.exit(error, { silent: true })
expectAssignable<Options>({ silent: true })
expectError(
  ModernError.subclass('TestError', {
    plugins: [modernErrorsCli],
    cli: { silent: 'true' },
  }),
)
expectError(BaseError.exit(error, { silent: 'true' }))
expectNotAssignable<Options>({ silent: 'true' })
