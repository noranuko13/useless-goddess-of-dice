import discord, { Message, MessageEmbed } from 'discord.js'
import { injectable } from 'tsyringe'
import { ReplyError } from './@error'
import { ContentService, LoggerService, MessageService, ResolverService } from './@service'
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

    client.login(this.config.getToken()).then(() => {
      this.loggerService.getLogger().info('Login!')
    })

    client.once('ready', () => {
      this.loggerService.getLogger().info('Ready!')
    })

    client.on('message', this.listener)
  }

  private listener = (message: Message): void => {
    if (!this.messageService.isValid(message)) {
      return
    }

    this.loggerService.getLogger().info('Start message event.')
    const content = this.autoFormatContext(message.content)

    let command: Command
    try {
      command = this.resolver.getCommand(content)
      this.loggerService.getLogger().info('Cast dice!')
      command.cast()
    } catch (error) {
      if (error instanceof ReplyError) {
        this.sendWarn(message, error, content)
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
    }).then(() => {
      this.loggerService.getLogger().info('End message event.')
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

  private sendWarn (message: Message, error: Error, content: string): void {
    this.loggerService.getLogger().warn(`${content}, ${error.message}`)

    message.channel.send({
      embed: new MessageEmbed({
        color: 'ORANGE',
        description: ':warning: ' + error.message
      })
    }).catch((error) => {
      this.loggerService.getLogger().error(error)
    })
  }
}
