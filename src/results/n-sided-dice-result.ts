import { Calc } from '../@static/calc'

import { NSidedDice } from '../dices'
import { Result } from './result.interface'

export class NSidedDiceResult implements Result {
  private addDices: NSidedDice[] = [];
  private subDices: NSidedDice[] = [];
  private addNumbers: number[] = [];
  private subNumbers: number[] = [];

  setAddDices (nSidedDices: NSidedDice[]): void {
    this.addDices = nSidedDices
  }

  setSubDices (nSidedDices: NSidedDice[]): void {
    this.subDices = nSidedDices
  }

  setAddNumbers (numbers: number[]) {
    this.addNumbers = numbers
  }

  setSubNumbers (numbers: number[]) {
    this.subNumbers = numbers
  }

  toString = () : string => {
    const formatWithBrackets = (symbol: string, numbers: number[]): string[] => {
      const contents: string[] = []
      if (numbers.length) {
        contents.push(symbol)
        contents.push('(')
        contents.push(numbers.map(num => num.toString()).join(' + '))
        contents.push(')')
      }
      return contents
    }

    let contents: string[] = []
    contents = contents.concat(
      formatWithBrackets('+', this.addDices.map(dice => dice.getDeme())),
      formatWithBrackets('-', this.subDices.map(dice => dice.getDeme())),
      formatWithBrackets('+', this.addNumbers),
      formatWithBrackets('-', this.subNumbers)
    )

    if (contents.length) {
      contents.push('=')
      contents.push(this.total().toString())
    }

    return contents.join(' ')
  }

  total (): number {
    return Calc.sumOfNSidedDice(this.addDices) - Calc.sumOfNSidedDice(this.subDices) +
      Calc.sumOfNumbers(this.addNumbers) - Calc.sumOfNumbers(this.subNumbers)
  }
}
