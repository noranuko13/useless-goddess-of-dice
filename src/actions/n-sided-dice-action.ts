import { MessageEmbed } from 'discord.js'
import { injectable } from 'tsyringe'
import { BadCommandError } from '../@error'
import { Formula } from '../@static'
import { NSidedDiceCommand } from '../commands'
import { Action } from './action.interface'

@injectable()
export class NSidedDiceAction implements Action {
  parse (content: string): NSidedDiceCommand {
    const args = content.split(/ +/).filter(Boolean)
    if (!args.length) {
      throw new BadCommandError()
    }

    Formula.validate(content)

    return new NSidedDiceCommand(args)
  }

  cast (command: NSidedDiceCommand): MessageEmbed {
    return new MessageEmbed({
      description: command.toString()
    })
  }
}
