import { MessageEmbed } from 'discord.js'
import { injectable } from 'tsyringe'
import { ChoiceDiceCommand } from '../commands'
import { NSidedDice } from '../dices'
import { ChoiceDiceResult } from '../results'
import { Action } from './action.interface'

@injectable()
export class ChoiceDiceAction implements Action {
  parse (content: string): ChoiceDiceCommand {
    content = content.replace(/^choice +/, '')
    const args = content.split(/ +/).filter(Boolean)
    return new ChoiceDiceCommand(args)
  }

  cast (command: ChoiceDiceCommand): MessageEmbed {
    const dice: NSidedDice = new NSidedDice(command.getSide())
    const word = command.getWords()[dice.getDeme() - 1]

    const result = new ChoiceDiceResult(word)
    return new MessageEmbed({
      description: result.toString()
    })
  }
}
