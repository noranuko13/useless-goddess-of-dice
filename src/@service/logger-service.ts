import { Logger } from 'tslog'
import { injectable } from 'tsyringe'
import { Config } from '../config'

@injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor (private config: Config) {
    this.logger = new Logger({
      name: 'DEFAULT',
      displayDateTime: false,
      displayFunctionName: false,
      minLevel: config.getLogLevel(),
      colorizePrettyLogs: config.isDebug(),
      type: config.isDebug() ? 'pretty' : 'json'
    })
  }

  getLogger (): Logger {
    return this.logger
  }
}
