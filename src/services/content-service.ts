import { injectable } from 'tsyringe'
import { Config } from '../config'

@injectable()
export class ContentService {
  constructor (private config: Config) {}

  public removeCommandPrefix (text: string) {
    text = text.replace(this.config.getPrefix(), '')
    return text.trimLeft()
  }

  public addWhitespaceToBothEnds (text: string, pattern: string = '+-') {
    text = text.replace(new RegExp(`([${pattern}])`, 'g'), ' $1 ')
    text = text.replace(new RegExp(` +([${pattern}]) +`, 'g'), ' $1 ')
    return text
  }

  public removeDuplicateWhitespace (text: string) {
    text = text.replace(/ +/g, ' ')
    return text.trim()
  }

  public toHalfWidth (text: string) {
    text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
    text = text.replace(/\s+/g, ' ')
    return text
  }
}
