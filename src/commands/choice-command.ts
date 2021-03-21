import { Calc } from '../@static'
import { Command } from './command.interface'

export class ChoiceCommand implements Command {
  constructor (
    private readonly words: string[],
    private index: number = 0
  ) {}

  getWords (): string[] {
    return this.words
  }

  getRange (): [min: number, max: number] {
    return [0, this.words.length - 1]
  }

  toString (): string {
    this.index = Calc.getIntByRange(...this.getRange())

    const contents: string[] = []
    contents.push(':black_circle:')

    contents.push('( ＝Д＝)')
    contents.push(this.words[this.index])
    contents.push('！')

    return contents.join(' ')
  }
}
