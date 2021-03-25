import { Template } from '../@static'
import { ReplyError } from './reply-error.abstract'

export class NotFoundError extends ReplyError {
  code: string = '404'

  constructor () {
    super(Template.messages.error.notFound)
    this.name = 'NotFoundError'
  }
}
