import { ReplyError } from './reply-error.abstract'

export class NotFoundError extends ReplyError {
  code: string = '404'

  constructor () {
    super('疲れてるの？(´・д・)引数がないの・・・')
    this.name = 'NotFoundError'
  }
}
