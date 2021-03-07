import { Logger } from 'tslog'
import { ISettingsParam } from 'tslog/src/index'
import { injectable } from 'tsyringe'
import { Config } from '../config'

@injectable()
export class LoggerService {
  private readonly settings: ISettingsParam;
  private readonly logger: Logger;

  constructor (private config: Config) {
    this.settings = {
      name: 'DEFAULT',
      displayDateTime: false,
      displayFunctionName: false,
      minLevel: config.getLogLevel(),
      colorizePrettyLogs: config.isDebug()
    }
    this.logger = new Logger(this.settings)
  }

  getLogger (): Logger {
    return this.logger
  }
}
