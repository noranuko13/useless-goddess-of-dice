import { injectable } from 'tsyringe'
import { BadCommandError, NotFoundError } from '../@error'
import { Formula } from '../@static'
import { ChoiceCommand, Command, NSidedDiceCommand } from '../commands'

@injectable()
export class ResolverService {
  getCommand (content: string): Command {
    const args = content.split(/ +/).filter(Boolean)
    if (args.length === 0) {
      throw new NotFoundError()
    }

    // Choice
    if (/^choice$/.test(args[0])) {
      args.shift()
      if (args.length === 0) {
        throw new NotFoundError()
      }
      return new ChoiceCommand(args)
    }

    // NSidedDice
    if (/^\d+d\d+$|^\d+$|^\+$|^-$/.test(args[0])) {
      Formula.validate(content)
      return new NSidedDiceCommand(args)
    }

    throw new BadCommandError()
  }
}
