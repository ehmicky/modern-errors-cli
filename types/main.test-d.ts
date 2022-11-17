import modernErrors from 'modern-errors'
import modernErrorsCli, { Options } from 'modern-errors-cli'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

const BaseError = modernErrors([modernErrorsCli])
const error = new BaseError('', { cause: '' })
expectType<void>(error.exit())

modernErrors([modernErrorsCli], { cli: {} })
error.exit({})
expectAssignable<Options>({})
expectError(error.exit(undefined))
expectNotAssignable<Options>(undefined)
expectError(modernErrors([modernErrorsCli], { cli: true }))
expectError(error.exit(true))
expectNotAssignable<Options>(true)
expectError(modernErrors([modernErrorsCli], { cli: { unknown: true } }))
expectError(error.exit({ unknown: true }))
expectNotAssignable<Options>({ unknown: true })

modernErrors([modernErrorsCli], { cli: { silent: true } })
error.exit({ silent: true })
expectAssignable<Options>({ silent: true })
expectError(modernErrors([modernErrorsCli], { cli: { silent: 'true' } }))
expectError(error.exit({ silent: 'true' }))
expectNotAssignable<Options>({ silent: 'true' })
