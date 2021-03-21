import assert from 'assert'
import 'reflect-metadata'
import { LoggerService } from '../../src/@service'
import { Config } from '../../src/config'

describe('LoggerService', () => {
  describe('Create instance', () => {
    it('UGD_DEBUG=0', () => {
      process.env = {
        UGD_DEBUG: '0'
      }
      const service = new LoggerService(new Config())
      assert.strictEqual(service.getLogger().settings.type, 'json')
    })

    it('UGD_DEBUG=1', () => {
      process.env = {
        UGD_DEBUG: '1'
      }
      const service = new LoggerService(new Config())
      assert.strictEqual(service.getLogger().settings.type, 'pretty')
    })
  })
})
