import discord, { Message } from 'discord.js'
import { injectable } from 'tsyringe'
import { ClientInterface } from '../@client'
import { Config } from '../config'
import { DiceRoller } from '../rollers'
import { MessageService } from '../services'

@injectable()
export class DiscordClient implements ClientInterface {
  constructor (private config: Config, private ms: MessageService, private roller: DiceRoller) {}

  waitInput (): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', (message: Message) => {
      if (!this.ms.isValid(message)) {
        return
      }

      const content = this.roller.roll(message.content)
      message.channel.send(content).then()
    })

    client.login(this.config.getToken()).then()
  }
}
