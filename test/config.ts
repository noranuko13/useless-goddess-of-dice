import assert from 'assert'
import 'reflect-metadata'
import { Config } from '../src/config'

describe('Config', () => {
  describe('Create instance', () => {
    it('new Config()', () => {
      assert.doesNotThrow(() => { return new Config() })
    })
  })

  describe('#isDebug()', () => {
    it('UGD_DEBUG=0', () => {
      process.env = {
        UGD_DEBUG: '0'
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), false)
    })

    it('UGD_DEBUG=1', () => {
      process.env = {
        UGD_DEBUG: '1'
      }
      const config: Config = new Config()
      assert.strictEqual(config.isDebug(), true)
    })
  })

  describe('#getToken()', () => {
    it('UGD_DISCORD_TOKEN=DUMMY_TOKEN', () => {
      process.env = {
        UGD_DISCORD_TOKEN: 'DUMMY_TOKEN'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getToken(), 'DUMMY_TOKEN')
    })
  })

  describe('#getPrefix()', () => {
    it('UGD_COMMAND_PREFIX=/prefix', () => {
      process.env = {
        UGD_COMMAND_PREFIX: '/prefix'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getPrefix(), '/prefix')
    })
  })

  describe('#getLogLevel()', () => {
    it('UGD_LOG_LEVEL=TLogLevelName', () => {
      process.env = {
        UGD_LOG_LEVEL: 'trace'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'trace')
    })

    it('UGD_LOG_LEVEL!=TLogLevelName and UGD_DEBUG=0', () => {
      process.env = {
        UGD_DEBUG: '0',
        UGD_LOG_LEVEL: 'dummy'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'error')
    })

    it('UGD_LOG_LEVEL!=TLogLevelName and UGD_DEBUG=1', () => {
      process.env = {
        UGD_DEBUG: '1',
        UGD_LOG_LEVEL: 'dummy'
      }
      const config: Config = new Config()
      assert.strictEqual(config.getLogLevel(), 'debug')
    })
  })
})
