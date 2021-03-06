import { ReplyError } from './reply-error'

export class NotFoundError extends ReplyError {
  constructor () {
    super('疲れてるの？(´・д・)引数がないの・・・')
    this.name = 'NotFoundError'
  }
}
