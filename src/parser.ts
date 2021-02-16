import { injectable } from 'tsyringe'

export interface DiceCommand {
  time: number
  side: number
}

@injectable()
export class Command {
  private readonly addDices: DiceCommand[];
  private readonly subDices: DiceCommand[];

  constructor () {
    this.addDices = []
    this.subDices = []
  }

  addAddDice (str: string): void {
    this.addDices.push(this.createDiceCommand(str))
  }

  getAddDices () {
    return this.addDices
  }

  addSubDice (str: string): void {
    this.subDices.push(this.createDiceCommand(str))
  }

  getSubDices () {
    return this.subDices
  }

  private createDiceCommand (str: string): DiceCommand {
    const numbers = str.match(/^(\d+)d(\d+)$/) || []
    return {
      time: parseInt(numbers[1]),
      side: parseInt(numbers[2])
    } as DiceCommand
  }
}

@injectable()
export class MessageParser {
  run (input: string): Command {
    const args = input.split(/ +/)
    const command = new Command()
    let symbol = '+'

    args.forEach(arg => {
      switch (true) {
        case /^\d+d\d+$/.test(arg):
          if (symbol === '+') command.addAddDice(arg)
          if (symbol === '-') command.addSubDice(arg)
          break
        case /\+/.test(arg):
          symbol = '+'
          break
        case /-/.test(arg):
          symbol = '-'
          break
        default:
      }
    })

    return command
  }
}
