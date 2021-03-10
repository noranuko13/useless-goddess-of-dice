import { Command } from './command.interface'
import { DiceCommand } from './dice-command'

export class NSidedDiceCommand implements Command {
  private readonly addDices: DiceCommand[] = [];
  private readonly subDices: DiceCommand[] = [];
  private addNumbers: number[] = [];
  private subNumbers: number[] = [];

  addAddDice (str: string): void {
    this.addDices.push(new DiceCommand(str))
  }

  getAddDices () {
    return this.addDices
  }

  addSubDice (str: string): void {
    this.subDices.push(new DiceCommand(str))
  }

  getSubDices () {
    return this.subDices
  }

  addAddNumber (str: string) {
    this.addNumbers.push(parseInt(str))
  }

  getAddNumbers () {
    return this.addNumbers
  }

  addSubNumber (str: string) {
    this.subNumbers.push(parseInt(str))
  }

  getSubNumbers () {
    return this.subNumbers
  }
}
