import assert from 'assert'
import 'reflect-metadata'
import { LoggerService } from '../../src/@service'
import { Config } from '../../src/config'

describe('LoggerService', function () {
  describe('Create instance', function () {
    it('UGD_DEBUG=off', function () {
      process.env = {
        UGD_DEBUG: 'off'
      }
      const service = new LoggerService(new Config())
      assert.strictEqual(service.getLogger().settings.type, 'json')
    })

    it('UGD_DEBUG=on', function () {
      process.env = {
        UGD_DEBUG: 'on'
      }
      const service = new LoggerService(new Config())
      assert.strictEqual(service.getLogger().settings.type, 'pretty')
    })
  })
})
