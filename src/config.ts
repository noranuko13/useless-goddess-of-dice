import dotenv from 'dotenv'
import { injectable } from 'tsyringe'

export interface Env {
  UGD_DEBUG: string;
  UGD_DISCORD_TOKEN: string;
  UGD_CMD_PREFIX: string;
}

@injectable()
export class Config {
  private env: Env

  constructor () {
    this.env = dotenv.config().parsed as unknown as Env
  }

  isDebug (): boolean {
    return this.env.UGD_DEBUG === '1'
  }

  getToken (): string {
    return this.env.UGD_DISCORD_TOKEN
  }

  getPrefix (): string {
    return this.env.UGD_CMD_PREFIX
  }
}
