import { injectable } from 'tsyringe'
import { Config } from './config'

@injectable()
export class MessageConverter {
  private config: Config;

  constructor (config: Config) {
    this.config = config
  }

  removePrefix (text: string) {
    text = text.replace(this.config.getPrefix(), '')
    return text.trimLeft()
  }

  removeWhiteSpace (text: string) {
    text = text.replace(/ +/g, ' ')
    return text.trim()
  }

  toHalfWidth (text: string) {
    return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
  }
}
