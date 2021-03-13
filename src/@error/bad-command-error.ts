import { ReplyError } from './reply-error.abstract'

export class BadCommandError extends ReplyError {
  code: string = '400'

  constructor () {
    super('駄女神わかんにゃーい(´・ω・)')
    this.name = 'BadCommandError'
  }
}
