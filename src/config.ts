import dotenv from 'dotenv'

export interface Env {
  DEBUG: string;
  TOKEN: string;
}

export class Config {
  static get Env (): Env {
    return dotenv.config().parsed as unknown as Env
  }
}
