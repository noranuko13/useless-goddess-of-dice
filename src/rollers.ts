import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { MessageConverter } from './converter'
import { DiceCommand, MessageParser } from './parser'
import { NSidedDice } from './dices'

export class DiceResult {
  private addDices: NSidedDice[] = [];
  private subDices: NSidedDice[] = [];

  constructor (result?: { subDices: NSidedDice[]; addDices: NSidedDice[] }) {
    Object.assign(this, result)
  }

  toString = () : string => {
    const contents: string[] = []
    Array.prototype.push.apply(contents, this.toStringDices('+', this.addDices))
    Array.prototype.push.apply(contents, this.toStringDices('-', this.subDices))

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

  private getTotal (): number {
    return this.getDiceTotal(this.addDices) - this.getDiceTotal(this.subDices)
  }

  private getDiceTotal (dices: NSidedDice[]): number {
    return dices.reduce((acc, dice) => acc + dice.getDeme(), 0)
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
      subDices: this.rollNSidedDice(command.getSubDices())
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
