import dotenv from 'dotenv'
import { Logger } from 'tslog'
import { TLogLevelName } from 'tslog/src/interfaces'
import { injectable } from 'tsyringe'

interface Env {
  UGD_DEBUG: string;
  UGD_DISCORD_TOKEN: string;
  UGD_COMMAND_PREFIX: string;
  UGD_LOG_LEVEL: string;
}

@injectable()
export class Config {
  private env: Env
  private logLevels: TLogLevelName[] = (new Logger() as any)._logLevels

  constructor () {
    dotenv.config()
    this.env = {
      UGD_DEBUG: process.env.UGD_DEBUG,
      UGD_DISCORD_TOKEN: process.env.UGD_DISCORD_TOKEN,
      UGD_COMMAND_PREFIX: process.env.UGD_COMMAND_PREFIX,
      UGD_LOG_LEVEL: process.env.UGD_LOG_LEVEL
    } as Env
  }

  isDebug (): boolean {
    return this.env.UGD_DEBUG === '1'
  }

  getToken (): string {
    return this.env.UGD_DISCORD_TOKEN
  }

  getPrefix (): string {
    return this.env.UGD_COMMAND_PREFIX
  }

  getLogLevel (): TLogLevelName {
    if (this.logLevels.includes(this.env.UGD_LOG_LEVEL as TLogLevelName)) {
      return this.env.UGD_LOG_LEVEL as TLogLevelName
    }
    return this.isDebug() ? 'debug' : 'error'
  }
}
