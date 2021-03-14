import { Command } from './command.interface'

export class ChoiceDiceCommand implements Command {
  private readonly words: string[];

  constructor (words: string[]) {
    this.words = words
  }

  getWords (): string[] {
    return this.words
  }

  getSide (): number {
    return this.words.length
  }
}
