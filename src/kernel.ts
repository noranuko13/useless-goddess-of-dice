import discord, { Message } from 'discord.js'
import { container, injectable } from 'tsyringe'
import { ReplyError } from './@error'
import { ContentService, MessageService } from './@service'
import { LoggerService } from './@service/logger-service'
import { Command } from './commands'
import { Config } from './config'
import { Constant } from './constant'
import { Service } from './services'

@injectable()
export class Kernel {
  constructor (
    private config: Config,
    private ms: MessageService,
    private cs: ContentService,
    private ls: LoggerService
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

      let service: Service
      try {
        const type = Constant.diceTypeOf(content)
        service = container.resolve(type)
      } catch (error) {
        if (error instanceof ReplyError) {
          this.ls.getLogger().warn(error)
          message.channel.send(error.message).then()
          return
        }
        throw error
      }

      let command: Command
      try {
        command = service.parse(content)
      } catch (error) {
        if (error instanceof ReplyError) {
          this.ls.getLogger().warn(error)
          message.channel.send(error.message).then()
          return
        }
        throw error
      }

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
