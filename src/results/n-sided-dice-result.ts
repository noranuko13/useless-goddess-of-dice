import { Calc } from '../@static'
import { Result } from './result.interface'

export class NSidedDiceResult implements Result {
  constructor (
    private addDices: number[],
    private subDices: number[],
    private addNumbers: number[],
    private subNumbers: number[]
  ) {}

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
    contents.push(':black_circle:')

    contents = contents.concat(
      formatWithBrackets('+', this.addDices),
      formatWithBrackets('-', this.subDices),
      formatWithBrackets('+', this.addNumbers),
      formatWithBrackets('-', this.subNumbers)
    )

    contents.push('=')
    contents.push(this.total().toString())

    return contents.join(' ')
  }

  total (): number {
    return Calc.sumOfNumbers(this.addDices) - Calc.sumOfNumbers(this.subDices) +
      Calc.sumOfNumbers(this.addNumbers) - Calc.sumOfNumbers(this.subNumbers)
  }
}
