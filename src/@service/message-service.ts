import { Message } from 'discord.js'
import { injectable } from 'tsyringe'
import { Config } from '../config'

@injectable()
export class MessageService {
  constructor (private config: Config) {}

  public isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix()) &&
      !message.author.bot
  }
}
