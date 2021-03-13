import assert from 'assert'
import 'reflect-metadata'
import { TLogLevelName } from 'tslog'
import { container } from 'tsyringe'
import { LoggerService } from '../../src/@service'
import { Config } from '../../src/config'

describe('LoggerService', function () {
  container.register(Config, {
    useValue: {
      getLogLevel (): TLogLevelName {
        return 'debug'
      },
      isDebug (): boolean {
        return true
      }
    } as Config
  })
  const service = container.resolve(LoggerService)

  describe('#getLogger()', function () {
    it('Get instance.', function () {
      assert.doesNotThrow(() => { return service.getLogger() })
    })
  })
})
