import * as readline from 'readline'
import discord, { Message } from 'discord.js'
import { Config } from './config'
import { injectable } from 'tsyringe'
import { DiceRoller } from './rollers'

export interface Client {
  waitInput(): void
}

@injectable()
export class DebugClient implements Client {
  constructor (private roller: DiceRoller) {}

  rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  waitInput (): void {
    this.rl.question('入力: ', (answer) => {
      const content = this.roller.roll(answer)
      console.log('出力: ' + content)
      this.waitInput()
    })
  };
}

@injectable()
export class DiscordClient implements Client {
  constructor (private config: Config, private roller: DiceRoller) {}

  waitInput (): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', message => {
      if (!this.isValid(message)) {
        return
      }

      const content = this.roller.roll(message.content)
      message.channel.send(content).then()
    })

    client.login(this.config.getToken()).then()
  }

  private isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix()) &&
      !message.author.bot
  }
}
