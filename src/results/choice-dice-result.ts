import { Result } from './result.interface'

export class ChoiceDiceResult implements Result {
  constructor (private word: string) {}

  toString = () : string => {
    const contents: string[] = []
    contents.push(':black_circle:')

    contents.push('( ＝Д＝)')
    contents.push(this.word)
    contents.push('！')

    return contents.join(' ')
  }
}
