import test from 'ava'
import modernErrors from 'modern-errors'
import CLI_PLUGIN from 'modern-errors-cli'
import { each } from 'test-each'

import { errorExit } from './helpers/main.js'

const globalOpts = { cli: { timeout: 0 } }
const exitCode = 5
const message = 'test'

const AnyError = modernErrors([CLI_PLUGIN], globalOpts)
const UnknownError = AnyError.subclass('UnknownError')
const OneError = AnyError.subclass('OneError')
const TwoError = AnyError.subclass('TwoError', { cli: { exitCode } })
const ThreeError = AnyError.subclass('ThreeError')

const error = new OneError(message)

each(
  [true, { timeout: 'true' }, { unknown: true }, { classes: {} }],
  ({ title }, cli) => {
    test(`Options are validated | ${title}`, (t) => {
      t.throws(error.exit.bind(error, cli))
    })
  },
)

test.serial('Call process.exit()', (t) => {
  t.true(Number.isInteger(errorExit(error).exitCode))
})

test.serial('Can pass "exitCode"', (t) => {
  t.is(errorExit(error, { exitCode }).exitCode, exitCode)
})

test.serial('"exitCode" defaults to incrementing number', (t) => {
  t.is(errorExit(new UnknownError('')).exitCode, 1)
  t.is(errorExit(new OneError('')).exitCode, 2)
  t.is(errorExit(new TwoError('')).exitCode, exitCode)
  // eslint-disable-next-line no-magic-numbers
  t.is(errorExit(new ThreeError('')).exitCode, 4)
})

test.serial('Can pass "stack"', (t) => {
  t.true(errorExit(error, { stack: true }).consoleArg.includes('at '))
})

test.serial('"stack" defaults to false', (t) => {
  t.false(errorExit(error).consoleArg.includes('at '))
})

test.serial('"stack" is true with unknown errors', (t) => {
  t.true(errorExit(new AnyError('', { cause: '' })).consoleArg.includes('at '))
})

test.serial('Can pass any options', (t) => {
  t.is(errorExit(error, { silent: true }).consoleArg, undefined)
})
