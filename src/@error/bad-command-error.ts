import { Template } from '../@static'
import { ReplyError } from './reply-error.abstract'

export class BadCommandError extends ReplyError {
  code: string = '400'

  constructor () {
    super(Template.messages.error.badCommand)
    this.name = 'BadCommandError'
  }
}
