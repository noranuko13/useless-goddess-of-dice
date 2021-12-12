import { Calc, Template } from '../@static'
import { Command } from './command.interface'

export class ChoiceCommand implements Command {
  private readonly words: string[]
  private index: number = 0

  constructor (words: string[]) {
    this.words = words
  }

  cast (): void {
    this.index = Calc.getIntByRange(0, this.words.length - 1)
  }

  toString (): string {
    const contents: string[] = []

    contents.push(':black_circle:')
    contents.push(Template.messages.commands.choiceCommand.replace(':WORD:', this.words[this.index]))

    return contents.join(' ')
  }
}
