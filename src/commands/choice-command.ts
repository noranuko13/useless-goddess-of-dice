import { Calc } from '../@static'
import { Command } from './command.interface'

export class ChoiceCommand implements Command {
  private readonly words: string[];
  private index: number = 0;

  constructor (words: string[]) {
    this.words = words
  }

  getWords (): string[] {
    return this.words
  }

  getRange (): [min: number, max: number] {
    return [0, this.words.length - 1]
  }

  cast (): void {
    this.index = Calc.getIntByRange(...this.getRange())
  }

  toString (): string {
    const contents: string[] = []
    contents.push(':black_circle:')

    contents.push('( ＝Д＝)')
    contents.push(this.words[this.index])
    contents.push('！')

    return contents.join(' ')
  }
}
