import { injectable } from 'tsyringe'
import { Config } from '../config'

@injectable()
export class ContentService {
  constructor (private config: Config) {}

  public removeCommandPrefix (content: string) {
    content = content.replace(this.config.getPrefix(), '')
    return content.trimLeft()
  }

  public addWhitespaceToBothEnds (content: string, pattern: string = '+-') {
    content = content.replace(new RegExp(`([${pattern}])`, 'g'), ' $1 ')
    content = content.replace(new RegExp(` +([${pattern}]) +`, 'g'), ' $1 ')
    return content
  }

  public removeDuplicateWhitespace (content: string) {
    content = content.replace(/ +/g, ' ')
    return content.trim()
  }

  public toHalfWidth (content: string) {
    content = content.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
    content = content.replace(/\s+/g, ' ')
    return content
  }
}
