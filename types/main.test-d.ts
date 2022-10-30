import modernErrors from 'modern-errors'
import modernErrorsCli, { Options } from 'modern-errors-cli'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

const AnyError = modernErrors([modernErrorsCli])
expectType<void>(AnyError.exit())

modernErrors([modernErrorsCli], { cli: {} })
AnyError.exit({})
expectAssignable<Options>({})
expectError(AnyError.exit(undefined))
expectNotAssignable<Options>(undefined)
expectError(modernErrors([modernErrorsCli], { cli: true }))
expectError(AnyError.exit(true))
expectNotAssignable<Options>(true)
expectError(modernErrors([modernErrorsCli], { cli: { unknown: true } }))
expectError(AnyError.exit({ unknown: true }))
expectNotAssignable<Options>({ unknown: true })

modernErrors([modernErrorsCli], { cli: { silent: true } })
AnyError.exit({ silent: true })
expectAssignable<Options>({ silent: true })
expectError(modernErrors([modernErrorsCli], { cli: { silent: 'true' } }))
expectError(AnyError.exit({ silent: 'true' }))
expectNotAssignable<Options>({ silent: 'true' })
