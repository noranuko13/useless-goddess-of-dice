import { container, injectable } from 'tsyringe'
import { BadCommandError, NotFoundError } from '../@error'
import { Action, ChoiceDiceAction, NSidedDiceAction } from '../actions'

@injectable()
export class ResolverService {
  getAction (content: string): Action {
    const args = content.split(/ +/).filter(Boolean)

    if (args.length === 0) {
      throw new NotFoundError()
    }

    if (/^choice$/.test(args[0])) {
      return container.resolve(ChoiceDiceAction)
    }

    if (/^\d+d\d+$|^\d+$|^\+$|^-$/.test(args[0])) {
      return container.resolve(NSidedDiceAction)
    }

    throw new BadCommandError()
  }
}
