import process from 'node:process'

import test from 'ava'
import ModernError from 'modern-errors'
import sinon, { type SinonStub } from 'sinon'
import { each } from 'test-each'

import modernErrorsCli, { type Options } from 'modern-errors-cli'

type ConsoleError = SinonStub<[string]>

// eslint-disable-next-line no-restricted-globals
const consoleError = sinon.stub(console, 'error') as ConsoleError
const processExit = sinon.stub(process, 'exit')

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
const errorExit = (errorArg: Error, options?: Options) => {
  try {
    consoleError.resetHistory()
    processExit.resetHistory()

    BaseError.exit(errorArg, options)

    const consoleArg = getStubArg(consoleError)
    return { consoleArg, exitCode: process.exitCode }
  } finally {
    process.exitCode = undefined
  }
}

const getStubArg = ({ args: [[firstCallFirstArg] = ['']] }: ConsoleError) =>
  firstCallFirstArg

const exitCode = 5
const message = 'test'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsCli],
  cli: { timeout: 0 },
})
const error = new BaseError(message)

each(
  [true, { timeout: 'true' }, { unknown: true }, { classes: {} }],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      t.throws(errorExit.bind(undefined, error, options as never))
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
  t.is(errorExit(error, { silent: true }).consoleArg, '')
})
