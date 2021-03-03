import { injectable } from 'tsyringe'
import { NSidedDiceCommand } from '../commands'

@injectable()
export class NSidedDiceService {
  parse (input: string): NSidedDiceCommand {
    const args = input.split(/ +/)
    const command = new NSidedDiceCommand()
    let symbol = '+'

    args.forEach(arg => {
      switch (true) {
        case /^\d+d\d+$/.test(arg):
          if (symbol === '+') command.addAddDice(arg)
          if (symbol === '-') command.addSubDice(arg)
          break
        case /^\d+$/.test(arg):
          if (symbol === '+') command.addAddNumber(arg)
          if (symbol === '-') command.addSubNumber(arg)
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
