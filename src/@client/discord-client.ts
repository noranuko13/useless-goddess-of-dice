import discord, { Message } from 'discord.js'
import { injectable } from 'tsyringe'
import { ClientInterface } from '../@client'
import { MessageService } from '../@service'
import { Config } from '../config'
import { Central } from '../central'

@injectable()
export class DiscordClient implements ClientInterface {
  constructor (private config: Config, private ms: MessageService, private roller: Central) {}

  waitInput (): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', (message: Message) => {
      if (!this.ms.isValid(message)) {
        return
      }

      const content = this.roller.process(message.content)
      message.channel.send(content).then()
    })

    client.login(this.config.getToken()).then()
  }
}
