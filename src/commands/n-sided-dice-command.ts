import { evaluate } from 'mathjs'
import { Formula } from '../@static'
import { Command } from './command.interface'
import { DiceCommand } from './dice-command'

export class NSidedDiceCommand implements Command {
  private readonly inputs: string[]
  private outputs: string[] = []
  private total: number = 0

  constructor (inputs: string[]) {
    Formula.validate(inputs.join(' '))
    this.inputs = inputs
  }

  cast (): void {
    const cloneInputs = (): string[] => {
      return Object.assign([], this.inputs)
    }

    const forCalculations: string[] = cloneInputs()
    this.outputs = cloneInputs()
    for (let index = 0; index < this.inputs.length; index++) {
      if (/^\d+d\d+$/.test(this.inputs[index])) {
        const diceCommand = new DiceCommand(this.inputs[index])
        diceCommand.cast()
        forCalculations[index] = diceCommand.getTotal().toString()
        this.outputs[index] = this.inputs[index] + diceCommand.toString()
      }
    }
    this.total = Math.floor(evaluate(forCalculations.join('')))
  }

  toString () : string {
    this.outputs.unshift(':black_circle:')

    this.outputs.push('=')
    this.outputs.push(this.total.toString())

    return this.outputs.join(' ')
  }

  toNumber (): number {
    return this.total
  }
}
