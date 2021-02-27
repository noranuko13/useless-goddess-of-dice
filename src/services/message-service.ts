import { Message } from 'discord.js'
import { Config } from '../config'
import { injectable } from 'tsyringe'

@injectable()
export class MessageService {
  constructor (private config: Config) {}

  public isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix()) &&
      !message.author.bot
  }
}
