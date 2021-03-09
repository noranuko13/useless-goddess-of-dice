import discord, { Message } from 'discord.js'
import { container, injectable } from 'tsyringe'
import { ReplyError } from './@error'
import { ContentService, MessageService } from './@service'
import { Config } from './config'
import { Constant } from './constant'
import { Service } from './services'

@injectable()
export class Kernel {
  constructor (
    private config: Config,
    private ms: MessageService,
    private cs: ContentService
  ) {}

  waitInput (client: discord.Client): void {
    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', (message: Message) => {
      if (!this.ms.isValid(message)) {
        return
      }

      const content = this.autoFormatContext(message.content)

      let service = {} as Service
      try {
        service = container.resolve(Constant.diceTypeOf(content))
      } catch (error) {
        if (error instanceof ReplyError) {
          message.channel.send(error.message).then()
          return
        }
      }

      const command = service.parse(content)
      const result = service.cast(command)

      message.channel.send(result.toString()).then()
    })

    client.login(this.config.getToken()).then()
  }

  private autoFormatContext (content: string): string {
    content = this.cs.toHalfWidth(content)
    content = this.cs.addWhitespaceToBothEnds(content)
    content = this.cs.removeDuplicateWhitespace(content)
    content = this.cs.removeCommandPrefix(content)
    return content
  }
}
