import { injectable } from 'tsyringe'
import { Config } from './config'

@injectable()
export class MessageConverter {
  constructor (private config: Config) {}

  run (text: string): string {
    text = this.toHalfWidth(text)
    text = this.addWhitespaceToBothEnds(text)
    text = this.removeDuplicateWhitespace(text)
    text = this.removeCommandPrefix(text)
    return text
  }

  private removeCommandPrefix (text: string) {
    text = text.replace(this.config.getPrefix(), '')
    return text.trimLeft()
  }

  private addWhitespaceToBothEnds (text: string, pattern: string = '+-') {
    text = text.replace(new RegExp(`([${pattern}])`, 'g'), ' $1 ')
    text = text.replace(new RegExp(` +([${pattern}]) +`, 'g'), ' $1 ')
    return text
  }

  private removeDuplicateWhitespace (text: string) {
    text = text.replace(/ +/g, ' ')
    return text.trim()
  }

  private toHalfWidth (text: string) {
    return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
  }
}
