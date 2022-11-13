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
expectType<void>(error.exit())

ModernError.subclass('TestError', { plugins: [modernErrorsCli], cli: {} })
error.exit({})
expectAssignable<Options>({})
expectError(error.exit(undefined))
expectNotAssignable<Options>(undefined)
expectError(
  ModernError.subclass('TestError', { plugins: [modernErrorsCli], cli: true }),
)
expectError(error.exit(true))
expectNotAssignable<Options>(true)
expectError(
  ModernError.subclass('TestError', {
    plugins: [modernErrorsCli],
    cli: { unknown: true },
  }),
)
expectError(error.exit({ unknown: true }))
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', {
  plugins: [modernErrorsCli],
  cli: { silent: true },
})
error.exit({ silent: true })
expectAssignable<Options>({ silent: true })
expectError(
  ModernError.subclass('TestError', {
    plugins: [modernErrorsCli],
    cli: { silent: 'true' },
  }),
)
expectError(error.exit({ silent: 'true' }))
expectNotAssignable<Options>({ silent: 'true' })
