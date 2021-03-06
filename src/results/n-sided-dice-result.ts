import { NSidedDice } from '../dices/n-sided-dice'
import { Result } from './result'

export class NSidedDiceResult extends Result {
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
    const contents: string[] = []
    Array.prototype.push.apply(contents, this.toStringDices('+', this.addDices))
    Array.prototype.push.apply(contents, this.toStringDices('-', this.subDices))

    Array.prototype.push.apply(contents, this.toStringNumbers('+', this.addNumbers))
    Array.prototype.push.apply(contents, this.toStringNumbers('-', this.subNumbers))

    if (contents.length) {
      contents.push('=')
      contents.push(this.getTotal().toString())
    }

    return contents.join(' ')
  }

  private toStringDices (symbol: string, dices: NSidedDice[]): string[] {
    const contents: string[] = []
    if (dices.length) {
      contents.push(symbol)
      contents.push('(')
      contents.push(dices.map(dice => dice.getDeme().toString()).join(' + '))
      contents.push(')')
    }
    return contents
  }

  private toStringNumbers (symbol: string, numbers: number[]): string[] {
    const contents: string[] = []
    if (numbers.length) {
      contents.push(symbol)
      contents.push('(')
      contents.push(numbers.map(num => num.toString()).join(' + '))
      contents.push(')')
    }
    return contents
  }

  private getTotal (): number {
    return this.getDiceTotal(this.addDices) - this.getDiceTotal(this.subDices) +
      this.getNumberTotal(this.addNumbers) - this.getNumberTotal(this.subNumbers)
  }

  private getDiceTotal (dices: NSidedDice[]): number {
    return dices.reduce((acc, dice) => acc + dice.getDeme(), 0)
  }

  private getNumberTotal (numbers: number[]) {
    return numbers.reduce((acc, num) => acc + num, 0)
  }
}
