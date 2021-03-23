import 'reflect-metadata'
import { TLogLevelName } from 'tslog'
import { container } from 'tsyringe'
import { Config } from '../src/config'

exports.mochaHooks = {
  'beforeEach' (done: any) {
    container.register(Config, {
      useValue: {
        getPrefix (): string { return '/ugd' },
        getLogLevel (): TLogLevelName { return 'fatal' },
        isDebug (): boolean { return false }
      } as Config
    })

    done()
  }
}
