import { evaluate } from 'mathjs'
import { Calc } from '../@static'
import { Command } from './command.interface'
import { DiceCommand } from './dice-command'

export class NSidedDiceCommand implements Command {
  constructor (private inputs: string[]) {}

  getInput (index: number): string {
    return this.inputs[index]
  }

  cloneInputs (): string[] {
    return Object.assign([], this.inputs)
  }

  toString () : string {
    const forCalculations: string[] = this.cloneInputs()
    const outputs: string[] = this.cloneInputs()
    for (let index = 0; index < this.inputs.length; index++) {
      if (/^\d+d\d+$/.test(this.getInput(index))) {
        const dices: string[] = []
        const diceCommand = new DiceCommand(this.getInput(index))
        for (let time = 1; time <= diceCommand.getTime(); time++) {
          dices.push(Calc.getIntByRange(...diceCommand.getRange()).toString())
        }
        forCalculations[index] = '(' + dices.join('+') + ')'
        outputs[index] = this.getInput(index) + '<' + dices.join(',') + '>'
      }
    }
    const total = evaluate(forCalculations.join(''))

    outputs.unshift(':black_circle:')

    outputs.push('=')
    outputs.push(total.toString())

    return outputs.join(' ')
  }
}
