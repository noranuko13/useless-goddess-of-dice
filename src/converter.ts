import { injectable } from 'tsyringe'
import { Config } from './config'

@injectable()
export class MessageConverter {
  private config: Config;

  constructor (config: Config) {
    this.config = config
  }

  run (text: string): string {
    text = this.toHalfWidth(text)
    text = this.addWhiteSpace(text)
    text = this.removeWhiteSpace(text)
    text = this.removePrefix(text)
    return text
  }

  private removePrefix (text: string) {
    text = text.replace(this.config.getPrefix(), '')
    return text.trimLeft()
  }

  private addWhiteSpace (text: string) {
    text = text.replace(/\+/g, ' + ')
    text = text.replace(/-/g, ' - ')
    text = text.replace(/ +([+-]) +/g, ' $1 ')
    return text
  }

  private removeWhiteSpace (text: string) {
    text = text.replace(/ +/g, ' ')
    return text.trim()
  }

  private toHalfWidth (text: string) {
    return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
  }
}
