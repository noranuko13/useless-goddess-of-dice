import { NSidedDice } from '../dices'
import { Result } from './result.interface'

export class ChoiceDiceResult implements Result {
  private words: string[] = [];
  private dice: NSidedDice = new NSidedDice(0);

  setWords (words: string[]): void {
    this.words = words
    this.dice = new NSidedDice(words.length)
  }

  toString = () : string => {
    const word = this.words[this.dice.getDeme() - 1]

    const contents: string[] = []
    contents.push(':black_circle:')
    contents.push('( ＝Д＝)')
    contents.push(word)
    contents.push('！')
    return contents.join(' ')
  }
}
