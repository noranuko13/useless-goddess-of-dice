import assert from 'assert'
import 'reflect-metadata'
import { Config } from '../src/config'

describe('Config', function () {
  describe('Create instance', function () {
    it('new Config()', function () {
      assert.doesNotThrow(() => { return new Config() })
    })
  })

  describe('#isDebug()', function () {
    it('UGD_DEBUG=0', function () {
      process.env = {
        UGD_DEBUG: '0'
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), false)
    })

    it('UGD_DEBUG=1', function () {
      process.env = {
        UGD_DEBUG: '1'
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), true)
    })
  })

  describe('#getToken()', function () {
    it('UGD_DISCORD_TOKEN=DUMMY_TOKEN', function () {
      process.env = {
        UGD_DISCORD_TOKEN: 'DUMMY_TOKEN'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getToken(), 'DUMMY_TOKEN')
    })
  })

  describe('#getPrefix()', function () {
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

    it('UGD_LOG_LEVEL!=TLogLevelName and UGD_DEBUG=0', function () {
      process.env = {
        UGD_DEBUG: '0',
        UGD_LOG_LEVEL: 'dummy'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'error')
    })

    it('UGD_LOG_LEVEL!=TLogLevelName and UGD_DEBUG=1', function () {
      process.env = {
        UGD_DEBUG: '1',
        UGD_LOG_LEVEL: 'dummy'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'debug')
    })
  })
})