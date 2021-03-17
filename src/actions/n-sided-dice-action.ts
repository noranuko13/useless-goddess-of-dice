import { MessageEmbed } from 'discord.js'
import { injectable } from 'tsyringe'
import { DiceCommand, NSidedDiceCommand } from '../commands'
import { NSidedDice } from '../dices'
import { NSidedDiceResult } from '../results'
import { Action } from './action.interface'

@injectable()
export class NSidedDiceAction implements Action {
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

  cast (command: NSidedDiceCommand): MessageEmbed {
    const castDices = (diceCommands: DiceCommand[]): number[] => {
      const dices: number[] = []
      diceCommands.forEach(diceCommand => {
        for (let i = 1; i <= diceCommand.getTime(); i++) {
          const nSidedDice = new NSidedDice(diceCommand.getSide())
          dices.push(nSidedDice.korokoro())
        }
      })
      return dices
    }

    const result = new NSidedDiceResult(
      castDices(command.getAddDices()),
      castDices(command.getSubDices()),
      command.getAddNumbers(),
      command.getSubNumbers()
    )
    return new MessageEmbed({
      description: result.toString()
    })
  }
}
