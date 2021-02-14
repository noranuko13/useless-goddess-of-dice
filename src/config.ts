import dotenv from 'dotenv'
import { injectable } from 'tsyringe'

export interface Env {
  DEBUG: string;
  TOKEN: string;
  PREFIX: string;
}

@injectable()
export class Config {
  private env: Env

  constructor () {
    this.env = dotenv.config().parsed as unknown as Env
  }

  isDebug (): boolean {
    return this.env.DEBUG === '1'
  }

  getToken (): string {
    return this.env.TOKEN
  }

  getPrefix (): string {
    return this.env.PREFIX
  }
}
