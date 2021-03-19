import { MessageEmbed } from 'discord.js'
import { injectable } from 'tsyringe'
import { NotFoundError } from '../@error'
import { Calc } from '../@static'
import { ChoiceCommand } from '../commands'
import { ChoiceResult } from '../results'
import { Action } from './action.interface'

@injectable()
export class ChoiceAction implements Action {
  parse (content: string): ChoiceCommand {
    content = content.replace(/^choice */, '')

    const args = content.split(/ +/).filter(Boolean)
    if (args.length === 0) {
      throw new NotFoundError()
    }

    return new ChoiceCommand(args)
  }

  cast (command: ChoiceCommand): MessageEmbed {
    const index = Calc.getIntByRange(...command.getRange())
    const word = command.getWords()[index]

    const result = new ChoiceResult(word)
    return new MessageEmbed({
      description: result.toString()
    })
  }
}
