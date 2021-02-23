import dotenv from 'dotenv'
import { injectable } from 'tsyringe'

interface Env {
  UGD_DEBUG: string;
  UGD_DISCORD_TOKEN: string;
  UGD_COMMAND_PREFIX: string;
}

@injectable()
export class Config {
  private env: Env

  constructor () {
    dotenv.config()
    this.env = {
      UGD_DEBUG: process.env.UGD_DEBUG,
      UGD_DISCORD_TOKEN: process.env.UGD_DISCORD_TOKEN,
      UGD_COMMAND_PREFIX: process.env.UGD_COMMAND_PREFIX
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
}
