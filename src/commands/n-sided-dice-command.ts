import { BadCommandError } from '../@error'
import { Command } from './command.interface'
import { DiceCommand } from './dice-command'

export class NSidedDiceCommand implements Command {
  private readonly addDices: DiceCommand[] = [];
  private readonly subDices: DiceCommand[] = [];
  private addNumbers: number[] = [];
  private subNumbers: number[] = [];

  constructor (args: string[]) {
    let symbol = '+'
    args.forEach(arg => {
      switch (true) {
        case /^\d+d\d+$/.test(arg):
          if (symbol === '+') this.addDices.push(new DiceCommand(arg))
          if (symbol === '-') this.subDices.push(new DiceCommand(arg))
          break
        case /^\d+$/.test(arg):
          if (symbol === '+') this.addNumbers.push(parseInt(arg))
          if (symbol === '-') this.subNumbers.push(parseInt(arg))
          break
        case /\+/.test(arg):
          symbol = '+'
          break
        case /-/.test(arg):
          symbol = '-'
          break
        default:
          throw new BadCommandError()
      }
    })
  }

  getAddDices () {
    return this.addDices
  }

  getSubDices () {
    return this.subDices
  }

  getAddNumbers () {
    return this.addNumbers
  }

  getSubNumbers () {
    return this.subNumbers
  }
}
