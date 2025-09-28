import process from 'node:process'

import test from 'ava'
import figures from 'figures'
import ModernError from 'modern-errors'
import modernErrorsBeautiful from 'modern-errors-beautiful'
import { stub, type SinonStub } from 'sinon'
import { each } from 'test-each'

import modernErrorsCli, { type Options } from 'modern-errors-cli'

type ConsoleError = SinonStub<[string]>

// eslint-disable-next-line no-restricted-globals
const consoleError = stub(console, 'error') as ConsoleError
const processExit = stub(process, 'exit')

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
const errorExit = (
  errorArg: Error,
  options?: Options,
  ErrorClass = BaseError,
) => {
  try {
    consoleError.resetHistory()
    processExit.resetHistory()

    ErrorClass.exit(errorArg, options)

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

const BothError = ModernError.subclass('BothError', {
  plugins: [modernErrorsCli, modernErrorsBeautiful],
  cli: { timeout: 0 },
})

each(
  [
    true,
    { timeout: 'true' },
    { log: true },
    { unknown: true },
    { classes: {} },
    { custom: 'pretty' },
  ],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      // @ts-expect-error Type checking should fail due to invalid options
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
  t.is(errorExit(error, { silent: true }).consoleArg, '')
})

test.serial('Can use together with modern-errors-beautiful', (t) => {
  const bothError = new BothError('test')
  t.is(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    bothError.beautiful({ stack: false }),
    `${figures.cross} BothError: test`,
  )
  t.is(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    errorExit(bothError, { stack: false }, BothError).consoleArg,
    `${figures.cross} BothError: test`,
  )
})

test.serial('Can use aggregate errors', (t) => {
  const { consoleArg } = errorExit(
    new BaseError('test', {
      cli: { icon: 'warning' },
      errors: [new BaseError('inner', { cli: { icon: 'info' } })],
    }),
  )
  t.true(consoleArg.includes(`${figures.warning} BaseError: test`))
  t.true(consoleArg.includes(`${figures.info} BaseError: inner`))
})

test('Returns beautified errors, static', (t) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const prettyMessage: string = BaseError.pretty(error)
  t.true(prettyMessage.includes(`${figures.cross} BaseError: test`))
})

test('Returns beautified errors, instance', (t) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const prettyMessage: string = error.pretty()
  t.true(prettyMessage.includes(`${figures.cross} BaseError: test`))
})
