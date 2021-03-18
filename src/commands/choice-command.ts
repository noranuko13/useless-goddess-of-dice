import { Command } from './command.interface'

export class ChoiceCommand implements Command {
  private readonly words: string[];

  constructor (words: string[]) {
    this.words = words
  }

  getWords (): string[] {
    return this.words
  }

  getRange (): [min: number, max: number] {
    return [0, this.words.length - 1]
  }
}
