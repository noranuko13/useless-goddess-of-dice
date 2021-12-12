import { BadCommandError } from '../@error'
import { Calc } from '../@static'
import { Command } from './command.interface'

export class DiceCommand implements Command {
  private readonly ndm: string
  private readonly time: number
  private readonly side: number
  private dices: number[] = []
  private total: number = 0

  constructor (ndm: string) {
    const numbers = ndm.match(/^(\d+)d(\d+)$/)
    if (!numbers) {
      throw new BadCommandError()
    }

    this.ndm = numbers[0]
    this.time = parseInt(numbers[1])
    this.side = parseInt(numbers[2])
  }

  cast (): void {
    this.dices = []
    this.total = 0

    for (let time = 1; time <= this.time; time++) {
      this.dices.push(Calc.getIntByRange(1, this.side))
    }
    this.total = Calc.sumOfNumbers(this.dices)
  }

  getTotal (): number {
    return this.total
  }

  toString (): string {
    return `<${this.dices.join(',')}>`
  }
}
