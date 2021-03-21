import { MessageEmbed } from 'discord.js'
import { evaluate } from 'mathjs'
import { injectable } from 'tsyringe'
import { BadCommandError, WrongFormulaError } from '../@error'
import { Calc } from '../@static'
import { DiceCommand, NSidedDiceCommand } from '../commands'
import { NSidedDiceResult } from '../results'
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
    const forCalculations: string[] = command.cloneInputs()
    const outputs: string[] = command.cloneInputs()
    for (let index = 0; index < command.cloneInputs().length; index++) {
      if (/^\d+d\d+$/.test(command.getInput(index))) {
        const dices: string[] = []
        const diceCommand = new DiceCommand(command.getInput(index))
        for (let time = 1; time <= diceCommand.getTime(); time++) {
          dices.push(Calc.getIntByRange(...diceCommand.getRange()).toString())
        }
        forCalculations[index] = '(' + dices.join('+') + ')'
        outputs[index] = command.getInput(index) + '<' + dices.join(',') + '>'
      }
    }
    const total = evaluate(forCalculations.join(''))

    const result = new NSidedDiceResult(outputs, total)
    return new MessageEmbed({
      description: result.toString()
    })
  }
}
