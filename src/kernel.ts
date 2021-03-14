import discord, { Message } from 'discord.js'
import { injectable } from 'tsyringe'
import { ReplyError } from './@error'
import { ContentService, LoggerService, MessageService, ResolverService } from './@service'
import { Action } from './actions'
import { Command } from './commands'
import { Config } from './config'

@injectable()
export class Kernel {
  constructor (
    private config: Config,
    private messageService: MessageService,
    private contentService: ContentService,
    private loggerService: LoggerService,
    private resolver: ResolverService
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
        action = this.resolver.getAction(content)
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
      this.loggerService.getLogger().silly(command)

      const result = action.cast(command)
      this.loggerService.getLogger().silly(result)
      message.channel.send(result.toString()).then()
    })

    client.login(this.config.getToken()).then()
  }

  private autoFormatContext (content: string): string {
    content = this.contentService.removeSubsequentLines(content)
    content = this.contentService.toHalfWidth(content)
    content = this.contentService.addWhitespaceToBothEnds(content)
    content = this.contentService.removeDuplicateWhitespace(content)
    content = this.contentService.removeCommandPrefix(content)
    return content
  }
}
