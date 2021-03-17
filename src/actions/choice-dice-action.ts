import { MessageEmbed } from 'discord.js'
import { injectable } from 'tsyringe'
import { BadCommandError } from '../@error'
import { Calc } from '../@static'
import { ChoiceDiceCommand } from '../commands'
import { ChoiceDiceResult } from '../results'
import { Action } from './action.interface'

@injectable()
export class ChoiceDiceAction implements Action {
  parse (content: string): ChoiceDiceCommand {
    content = content.replace(/^choice +/, '')

    const args = content.split(/ +/).filter(Boolean)
    if (!args.length) {
      throw new BadCommandError()
    }

    return new ChoiceDiceCommand(args)
  }

  cast (command: ChoiceDiceCommand): MessageEmbed {
    const index = Calc.getIntByRange(0, command.getSide() - 1)
    const word = command.getWords()[index]

    const result = new ChoiceDiceResult(word)
    return new MessageEmbed({
      description: result.toString()
    })
  }
}
