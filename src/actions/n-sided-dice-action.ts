import { MessageEmbed } from 'discord.js'
import { evaluate } from 'mathjs'
import { injectable } from 'tsyringe'
import { BadCommandError, WrongFormulaError } from '../@error'
import { NSidedDiceCommand } from '../commands'
import { Action } from './action.interface'

@injectable()
export class NSidedDiceAction implements Action {
  parse (content: string): NSidedDiceCommand {
    const args = content.split(/ +/).filter(Boolean)
    if (!args.length) {
      throw new BadCommandError()
    }

    try {
      const formula = content.replace(/\d+d\d+/g, '0')
      evaluate(formula)
      return new NSidedDiceCommand(args)
    } catch (error) {
      throw new WrongFormulaError(error.message)
    }
  }

  cast (command: NSidedDiceCommand): MessageEmbed {
    return new MessageEmbed({
      description: command.toString()
    })
  }
}
