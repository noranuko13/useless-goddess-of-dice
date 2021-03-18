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
    let contents: string[] = []
    contents.push(':black_circle:')

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
    contents = contents.concat(
      formatWithBrackets('+', this.addDices),
      formatWithBrackets('-', this.subDices),
      formatWithBrackets('+', this.addNumbers),
      formatWithBrackets('-', this.subNumbers)
    )

    const total = (): number => {
      return Calc.sumOfNumbers([...this.addDices, ...this.addNumbers]) -
        Calc.sumOfNumbers([...this.subDices, ...this.subNumbers])
    }
    contents.push('=')
    contents.push(total().toString())

    return contents.join(' ')
  }
}
