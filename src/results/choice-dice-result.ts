import { Result } from './result.interface'

export class ChoiceDiceResult implements Result {
  constructor (
    private word: string,
    private contents: string[] = []
  ) {}

  toString = () : string => {
    this.contents.push(':black_circle:')

    this.contents.push('( ＝Д＝)')
    this.contents.push(this.word)
    this.contents.push('！')

    return this.contents.join(' ')
  }
}
