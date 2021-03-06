import 'reflect-metadata'
import { container, injectable } from 'tsyringe'
import { ReplyError } from './@error'
import { ContentService } from './@service'
import { Constant } from './constant'
import { Service } from './services'

@injectable()
export class Central {
  constructor (private cs: ContentService) {}

  process (content: string): string {
    content = this.autoFormatContext(content)

    let service = {} as Service
    try {
      service = container.resolve(Constant.diceTypeOf(content))
    } catch (error) {
      if (error instanceof ReplyError) {
        return error.message
      }
    }

    const command = service.parse(content)
    const result = service.cast(command)
    return result.toString()
  }

  private autoFormatContext (content: string): string {
    content = this.cs.toHalfWidth(content)
    content = this.cs.addWhitespaceToBothEnds(content)
    content = this.cs.removeDuplicateWhitespace(content)
    content = this.cs.removeCommandPrefix(content)
    return content
  }
}
