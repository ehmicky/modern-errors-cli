import process from 'process'

import sinon from 'sinon'

// eslint-disable-next-line no-restricted-globals
sinon.stub(console, 'error')
sinon.stub(process, 'exit')

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const errorExit = function (error, options) {
  try {
    // eslint-disable-next-line no-restricted-globals, no-console
    console.error.resetHistory()
    process.exit.resetHistory()

    error.exit(options)

    // eslint-disable-next-line no-restricted-globals, no-console
    const consoleArg = getStubArg(console.error)
    return { consoleArg, exitCode: process.exitCode }
  } finally {
    process.exitCode = undefined
  }
}

const getStubArg = function ({ args: [[firstCallFirstArg] = []] }) {
  return firstCallFirstArg
}
