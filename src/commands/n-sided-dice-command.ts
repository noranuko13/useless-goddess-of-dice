import { Command } from './command.interface'

export class NSidedDiceCommand implements Command {
  constructor (private inputs: string[]) {}

  getInput (index: number): string {
    return this.inputs[index]
  }

  cloneInputs (): string[] {
    return Object.assign([], this.inputs)
  }
}
