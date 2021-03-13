import discord, { Message } from 'discord.js'
import { container, injectable } from 'tsyringe'
import { ReplyError } from './@error'
import { ContentService, LoggerService, MessageService } from './@service'
import { Action } from './actions'
import { Command } from './commands'
import { Config } from './config'
import { Constant } from './constant'

@injectable()
export class Kernel {
  constructor (
    private config: Config,
    private messageService: MessageService,
    private contentService: ContentService,
    private loggerService: LoggerService
  ) {}

  waitInput (): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', (message: Message) => {
      if (!this.messageService.isValid(message)) {
        return
      }

      const content = this.autoFormatContext(message.content)

      let action: Action
      try {
        const type = Constant.diceTypeOf(content)
        action = container.resolve(type)
      } catch (error) {
        if (error instanceof ReplyError) {
          this.loggerService.getLogger().warn(error)
          message.channel.send(error.message).then()
          return
        }
        throw error
      }

      let command: Command
      try {
        command = action.parse(content)
      } catch (error) {
        if (error instanceof ReplyError) {
          this.loggerService.getLogger().warn(error)
          message.channel.send(error.message).then()
          return
        }
        throw error
      }

      const result = action.cast(command)
      message.channel.send(result.toString()).then()
    })

    client.login(this.config.getToken()).then()
  }

  private autoFormatContext (content: string): string {
    content = this.contentService.toHalfWidth(content)
    content = this.contentService.addWhitespaceToBothEnds(content)
    content = this.contentService.removeDuplicateWhitespace(content)
    content = this.contentService.removeCommandPrefix(content)
    return content
  }
}
