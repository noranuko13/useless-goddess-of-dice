import { injectable } from 'tsyringe'
import { BadCommandError, NotFoundError } from '../@error'
import { ChoiceCommand, Command, NSidedDiceCommand } from '../commands'
import { SkillCommand } from '../commands/skill-command'

@injectable()
export class ResolverService {
  getCommand (content: string): Command {
    const args = content.split(/ +/).filter(Boolean)
    if (args.length === 0) {
      throw new NotFoundError()
    }

    const types = [
      { name: 'skill', Instance: SkillCommand },
      { name: 'choice', Instance: ChoiceCommand }
    ]
    for (let i = 0; i < types.length; i++) {
      if (args[0] === types[i].name) {
        args.shift()
        if (args.length === 0) {
          throw new NotFoundError()
        }
        return new types[i].Instance(args)
      }
    }

    // NSidedDice
    if (/^\d+d\d+$|^\d+$|^\+$|^-$/.test(args[0])) {
      return new NSidedDiceCommand(args)
    }

    throw new BadCommandError()
  }
}
