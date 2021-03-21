import { ReplyError } from './reply-error.abstract'

export class WrongFormulaError extends ReplyError {
  code: string = '400'

  constructor (message?: string) {
    super('( 3ω3) < Hi! ' + message)
    this.name = 'WrongFormulaError'
  }
}
