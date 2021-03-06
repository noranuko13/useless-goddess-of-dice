import { BadCommandError } from '../@error'
import { Command } from './command'

export class DiceCommand extends Command {
  private readonly ndm: string;
  private readonly time: number;
  private readonly side: number;

  constructor (ndm: string) {
    super()

    const numbers = ndm.match(/^(\d+)d(\d+)$/)
    if (!numbers) {
      throw new BadCommandError()
    }

    this.ndm = numbers[0]
    this.time = parseInt(numbers[1])
    this.side = parseInt(numbers[2])
  }

  getNdm (): string {
    return this.ndm
  }

  getTime (): number {
    return this.time
  }

  getSide (): number {
    return this.side
  }
}
