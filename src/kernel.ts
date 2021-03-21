import discord, { Message, MessageEmbed } from 'discord.js'
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

  waitInput = (): void => {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', this.listener)

    client.login(this.config.getToken()).then()
  }

  private listener = (message: Message): void => {
    if (!this.messageService.isValid(message)) {
      return
    }

    const content = this.autoFormatContext(message.content)

    let action: Action
    try {
      action = this.resolver.getAction(content)
    } catch (error) {
      if (error instanceof ReplyError) {
        this.sendErrorMessage(message, error)
        return
      }
      throw error
    }

    let command: Command
    try {
      command = action.parse(content)
    } catch (error) {
      if (error instanceof ReplyError) {
        this.sendErrorMessage(message, error)
        return
      }
      throw error
    }
    this.loggerService.getLogger().silly(command)

    const embed: MessageEmbed = new MessageEmbed({
      description: command.toString()
    })
    if (message.member?.displayHexColor) {
      embed.setColor(message.member?.displayHexColor)
    }
    message.channel.send({ embed: embed }).catch((error) => {
      this.loggerService.getLogger().error(error)
    })
  }

  private autoFormatContext (content: string): string {
    content = this.contentService.removeSubsequentLines(content)
    content = this.contentService.toHalfWidth(content)
    content = this.contentService.addWhitespaceToBothEnds(content)
    content = this.contentService.removeDuplicateWhitespace(content)
    content = this.contentService.removeCommandPrefix(content)
    return content
  }

  private sendErrorMessage (message: Message, error: Error): void {
    this.loggerService.getLogger().warn(error)

    message.channel.send({
      embed: new MessageEmbed({
        color: 'RED',
        description: error.message
      })
    }).catch((error) => {
      this.loggerService.getLogger().error(error)
    })
  }
}
