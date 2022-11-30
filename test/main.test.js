import test from 'ava'
import ModernError from 'modern-errors'
import modernErrorsCli from 'modern-errors-cli'
import { each } from 'test-each'

import { testErrorExit } from './helpers/main.test.js'

const exitCode = 5
const message = 'test'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsCli],
  cli: { timeout: 0 },
})
const error = new BaseError(message)
const errorExit = testErrorExit.bind(undefined, BaseError)

each(
  [true, { timeout: 'true' }, { unknown: true }, { classes: {} }],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      t.throws(errorExit.bind(undefined, error, options))
    })
  },
)

test.serial('Call process.exit()', (t) => {
  t.true(Number.isInteger(errorExit(error).exitCode))
})

test.serial('Can pass "exitCode" as instance option', (t) => {
  t.is(errorExit(error, { exitCode }).exitCode, exitCode)
})

test.serial('Can pass "exitCode" as class option', (t) => {
  const ExitCodeError = BaseError.subclass('ExitCodeError', {
    cli: { exitCode },
  })
  t.is(errorExit(new ExitCodeError('')).exitCode, exitCode)
})

test.serial('"exitCode" defaults to 1', (t) => {
  t.is(errorExit(new BaseError('')).exitCode, 1)
})

test.serial('Can pass "stack"', (t) => {
  t.false(errorExit(error, { stack: false }).consoleArg.includes('at '))
})

test.serial('"stack" defaults to true', (t) => {
  t.true(errorExit(error).consoleArg.includes('at '))
})

test.serial('Can pass any options', (t) => {
  t.is(errorExit(error, { silent: true }).consoleArg, undefined)
})
