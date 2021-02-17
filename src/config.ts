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
    dotenv.config()
    this.env = {
      UGD_DEBUG: process.env.UGD_DEBUG,
      UGD_DISCORD_TOKEN: process.env.UGD_DISCORD_TOKEN,
      UGD_CMD_PREFIX: process.env.UGD_CMD_PREFIX
    } as Env
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
