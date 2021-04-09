import assert from 'assert'
import 'reflect-metadata'
import { Config } from '../src/config'

describe('Config', function () {
  describe('#isDebug()', function () {
    it('UGD_DEBUG is required.', function () {
      process.env = {
        UGD_DEBUG: undefined
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), false)
    })

    it('UGD_DEBUG is invalid.', function () {
      process.env = {
        UGD_DEBUG: 'invalid'
      }
      const config: Config = new Config()
      assert.throws(() => { config.isDebug() }, ReferenceError)
    })

    it('UGD_DEBUG=off', function () {
      process.env = {
        UGD_DEBUG: 'off'
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), false)
    })

    it('UGD_DEBUG=on', function () {
      process.env = {
        UGD_DEBUG: 'on'
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), true)
    })
  })

  describe('#getToken()', function () {
    it('UGD_DISCORD_TOKEN is required.', function () {
      process.env = {
        UGD_DISCORD_TOKEN: undefined
      }
      const config: Config = new Config()
      assert.throws(() => { config.getToken() }, ReferenceError)
    })

    it('UGD_DISCORD_TOKEN=DUMMY_TOKEN', function () {
      process.env = {
        UGD_DISCORD_TOKEN: 'DUMMY_TOKEN'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getToken(), 'DUMMY_TOKEN')
    })
  })

  describe('#getPrefix()', function () {
    it('UGD_COMMAND_PREFIX is undefined.', function () {
      process.env = {
        UGD_COMMAND_PREFIX: undefined
      }
      const config: Config = new Config()
      assert.strictEqual(config.getPrefix(), '/ugd')
    })

    it('UGD_COMMAND_PREFIX=/prefix', function () {
      process.env = {
        UGD_COMMAND_PREFIX: '/prefix'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getPrefix(), '/prefix')
    })
  })

  describe('#getLogLevel()', function () {
    it('UGD_LOG_LEVEL=TLogLevelName', function () {
      process.env = {
        UGD_LOG_LEVEL: 'trace'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'trace')
    })

    it('UGD_LOG_LEVEL!=TLogLevelName and UGD_DEBUG=off', function () {
      process.env = {
        UGD_DEBUG: 'off',
        UGD_LOG_LEVEL: 'dummy'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'error')
    })

    it('UGD_LOG_LEVEL!=TLogLevelName and UGD_DEBUG=on', function () {
      process.env = {
        UGD_DEBUG: 'on',
        UGD_LOG_LEVEL: 'dummy'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'debug')
    })
  })
})
