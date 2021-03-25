import { Template } from '../@static'
import { ReplyError } from './reply-error.abstract'

export class WrongFormulaError extends ReplyError {
  code: string = '400'

  constructor (message: string) {
    super(Template.messages.error.wrongFormula.replace(':MESSAGE:', message))
    this.name = 'WrongFormulaError'
  }
}
