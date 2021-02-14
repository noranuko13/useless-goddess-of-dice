import * as readline from 'readline'
import discord, { Message } from 'discord.js'
import { Config } from './config'
import { injectable } from 'tsyringe'

export interface Client {
  waitInput(fn: (text: string) => string): void
}

export class DebugClient implements Client {
  rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  waitInput (fn: (answer: string) => string): void {
    this.rl.question('入力: ', (answer) => {
      if (fn) {
        const content = fn(answer)
        console.log('出力: ' + content)
      }
      this.waitInput(fn)
    })
  };
}

@injectable()
export class DiscordClient implements Client {
  private config: Config;

  constructor (config: Config) {
    this.config = config
  }

  waitInput (fn: (answer: string) => string): void {
    const client = new discord.Client()

    client.once('ready', () => {
      console.log('Ready!')
    })

    client.on('message', message => {
      if (!this.isValid(message)) {
        return
      }

      if (fn) {
        const content = fn(message.content)
        message.channel.send(content).then()
      }
    })

    client.login(this.config.getToken()).then()
  }

  private isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix()) &&
      !message.author.bot
  }
}
