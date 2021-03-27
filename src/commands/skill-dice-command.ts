import { BadCommandError } from '../@error'
import { Command } from './command.interface'
import { NSidedDiceCommand } from './n-sided-dice-command'

export class SkillDiceCommand implements Command {
  names: string[] = [];
  nSidedDice: NSidedDiceCommand;

  constructor (inputs: string[]) {
    const index: number = inputs.lastIndexOf('(')
    if (index === -1 || inputs[inputs.length - 1] !== ')') {
      throw new BadCommandError()
    }

    this.names = inputs.slice(0, index)

    const arts: string[] = inputs.slice(index, inputs.length)
    this.nSidedDice = new NSidedDiceCommand(arts)
  }

  cast (): void {
    this.nSidedDice.cast()
  }

  toString (): string {
    const outputs = []

    outputs.push(this.names.join(''))
    outputs.push(this.nSidedDice.toString())

    return outputs.join(' ')
  }
}
