import { injectable } from 'tsyringe'
import { DiceCommandInterface } from './dice-command.interface'

@injectable()
export class NSidedDiceCommand {
  private readonly addDices: DiceCommandInterface[] = [];
  private readonly subDices: DiceCommandInterface[] = [];
  private addNumbers: number[] = [];
  private subNumbers: number[] = [];

  addAddDice (str: string): void {
    this.addDices.push(this.createDiceCommand(str))
  }

  getAddDices () {
    return this.addDices
  }

  addSubDice (str: string): void {
    this.subDices.push(this.createDiceCommand(str))
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

  private createDiceCommand (str: string): DiceCommandInterface {
    const numbers = str.match(/^(\d+)d(\d+)$/) || []
    return {
      time: parseInt(numbers[1]),
      side: parseInt(numbers[2])
    } as DiceCommandInterface
  }
}
