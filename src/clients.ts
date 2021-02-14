import * as readline from 'readline'
import discord, { Message } from 'discord.js'
import { Config } from './config'
import { injectable } from 'tsyringe'
import { DiceRoller } from './rollers'

export interface Client {
  waitInput(roller: DiceRoller): void
}

export class DebugClient implements Client {
  rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  waitInput (roller: DiceRoller): void {
    this.rl.question('入力: ', (answer) => {
      const content = roller.roll(answer)
      console.log('出力: ' + content)
      this.waitInput(roller)
    })
  };
}

@injectable()
export class DiscordClient implements Client {
  private config: Config;

  constructor (config: Config) {
    this.config = config
  }

  waitInput (roller: DiceRoller): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', message => {
      if (!this.isValid(message)) {
        return
      }

      const content = roller.roll(message.content)
      message.channel.send(content).then()
    })

    client.login(this.config.getToken()).then()
  }

  private isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix()) &&
      !message.author.bot
  }
}
