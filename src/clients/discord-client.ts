import { injectable } from 'tsyringe'
import { Config } from '../config'
import { DiceRoller } from '../rollers'
import discord, { Message } from 'discord.js'
import { ClientInterface } from '../clients'

@injectable()
export class DiscordClient implements ClientInterface {
  constructor (private config: Config, private roller: DiceRoller) {}

  waitInput (): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', (message: Message) => {
      if (!this.isValid(message)) {
        return
      }

      this.output(message)
    })

    client.login(this.config.getToken()).then()
  }

  private output (message: Message): void {
    const content = this.roller.roll(message.content)
    message.channel.send(content).then()
  }

  private isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix()) &&
      !message.author.bot
  }
}