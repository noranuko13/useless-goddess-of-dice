import { BadCommandError } from '../@error'
import { Command } from './command.interface'

export class DiceCommand implements Command {
  private readonly ndm: string;
  private readonly time: number;
  private readonly side: number;

  constructor (ndm: string) {
    const numbers = ndm.match(/^(\d+)d(\d+)$/)
    if (!numbers) {
      throw new BadCommandError()
    }

    this.ndm = numbers[0]
    this.time = parseInt(numbers[1])
    this.side = parseInt(numbers[2])
  }

  getTime (): number {
    return this.time
  }

  getRange (): [min: number, max: number] {
    return [1, this.side]
  }
}
