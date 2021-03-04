import { injectable } from 'tsyringe'
import { DiceCommand, NSidedDiceCommand } from '../commands'
import { NSidedDice } from '../dices/n-sided-dice'
import { NSidedDiceResult } from '../results'
import { DiceService } from './dice-service'

@injectable()
export class NSidedDiceService implements DiceService {
  parse (content: string): NSidedDiceCommand {
    const args = content.split(/ +/).filter(Boolean)
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

  cast (command: NSidedDiceCommand): NSidedDiceResult {
    const castDices = (diceCommands: DiceCommand[]) => {
      const dices: NSidedDice[] = []
      diceCommands.forEach(diceCommand => {
        for (let i = 1; i <= diceCommand.getTime(); i++) {
          dices.push(new NSidedDice(diceCommand.getSide()))
        }
      })
      return dices
    }

    const result = new NSidedDiceResult()
    result.setAddDices(castDices(command.getAddDices()))
    result.setSubDices(castDices(command.getSubDices()))
    result.setAddNumbers(command.getAddNumbers())
    result.setSubNumbers(command.getSubNumbers())
    return result
  }
}
