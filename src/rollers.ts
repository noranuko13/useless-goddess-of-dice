import 'reflect-metadata'
import { container, injectable } from 'tsyringe'
import { ContentService } from './@service'
import { Constant } from './constant'
import { BadCommandError, NotFoundError, ReplyError } from './@error'
import { DiceService } from './services'

@injectable()
export class DiceRoller {
  constructor (private cs: ContentService) {}

  roll (content: string): string {
    content = this.autoFormatContext(content)

    let service = {} as DiceService
    try {
      service = container.resolve(this.getDiceType(content))
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

  private getDiceType (content: string): Constant.Values<typeof Constant.DiceType> {
    const args = content.split(/ +/).filter(Boolean)
    if (args.length === 0) {
      throw new NotFoundError()
    }

    if (/^\d+d\d+$|^\d+$|^\+$|^-$/.test(args[0])) {
      return Constant.DiceType.NSidedDice
    }

    throw new BadCommandError()
  }
}
