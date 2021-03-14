import assert from 'assert'
import 'reflect-metadata'
import { LoggerService } from '../../src/@service'
import { Config } from '../../src/config'

describe('LoggerService', function () {
  describe('Create instance.', function () {
    it('UGD_DEBUG=0', function () {
      process.env = {
        UGD_DEBUG: '0'
      }
      const service = new LoggerService(new Config())
      assert.strictEqual(service.getLogger().settings.type, 'json')
    })

    it('UGD_DEBUG=1', function () {
      process.env = {
        UGD_DEBUG: '1'
      }
      const service = new LoggerService(new Config())
      assert.strictEqual(service.getLogger().settings.type, 'pretty')
    })
  })
})
