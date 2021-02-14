import dotenv from 'dotenv'

export interface Env {
  DEBUG: string;
  TOKEN: string;
  PREFIX: string;
}

export class Config {
  env: Env = dotenv.config().parsed as unknown as Env

  isDebug (): boolean {
    return this.env.DEBUG === '1'
  }
}
