import { evaluate } from 'mathjs'
import { WrongFormulaError } from '../@error'

export class Formula {
  static validate (content: string): void {
    try {
      const formula = content.replace(/\d+d\d+/g, '0')
      evaluate(formula)
    } catch (error) {
      throw new WrongFormulaError(error.message)
    }
  }
}
