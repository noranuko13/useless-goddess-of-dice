import { ReplyError } from './reply-error'

export class BadCommandError extends ReplyError {
  constructor () {
    super('駄女神わかんにゃーい(´・ω・)')
    this.name = 'BadCommandError'
  }
}
