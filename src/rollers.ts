import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { MessageConverter } from './converter'
import { DiceCommand, MessageParser } from './parser'
import { NSidedDice } from './dices'

export class DiceResult {
  private addDices: NSidedDice[] = [];
  private subDices: NSidedDice[] = [];
  private addNumbers: number[] = [];
  private subNumbers: number[] = [];

  constructor (result?: { subDices: NSidedDice[]; addDices: NSidedDice[]; addNumbers: number[]; subNumbers: number[]; }) {
    Object.assign(this, result)
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

@injectable()
export class DiceRoller {
  constructor (private converter: MessageConverter, private parser: MessageParser) {}

  roll (text: string): string {
    text = this.converter.run(text)
    const command = this.parser.run(text)
    const result = new DiceResult({
      addDices: this.rollNSidedDice(command.getAddDices()),
      subDices: this.rollNSidedDice(command.getSubDices()),
      addNumbers: command.getAddNumbers(),
      subNumbers: command.getSubNumbers()
    })
    return result.toString()
  }

  private rollNSidedDice (diceCommands: DiceCommand[]): NSidedDice[] {
    const dices: NSidedDice[] = []
    diceCommands.forEach(diceCommand => {
      for (let i = 1; i <= diceCommand.time; i++) {
        dices.push(new NSidedDice(diceCommand.side))
      }
    })
    return dices
  }
}
