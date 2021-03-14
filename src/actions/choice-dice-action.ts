import { injectable } from 'tsyringe'
import { ChoiceDiceCommand } from '../commands'
import { ChoiceDiceResult } from '../results'
import { Action } from './action.interface'

@injectable()
export class ChoiceDiceAction implements Action {
  parse (content: string): ChoiceDiceCommand {
    content = content.replace(/^choice +/, '')
    const args = content.split(/ +/).filter(Boolean)
    return new ChoiceDiceCommand(args)
  }

  cast (command: ChoiceDiceCommand): ChoiceDiceResult {
    const result = new ChoiceDiceResult()
    result.setWords(command.getWords())
    return result
  }
}
