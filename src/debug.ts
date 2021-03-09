import discord, { ClientEvents, Message } from 'discord.js'
import readline from 'readline'

export module debug {
  export class Client extends discord.Client {
    private rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    once (event: string, listener: () => void): this {
      listener()
      return this
    }

    on<K extends keyof ClientEvents> (event: K, listener: (message: Message) => void): this {
      const fnc = () => {
        return this.rl.question('入力: ', (answer: string) => {
          const message = this.getMessage(answer)
          listener(message)
          fnc()
        })
      }
      fnc()
      return this
    }

    login (token?: string): Promise<string> {
      return new Promise<string>((resolve) => { resolve('') })
    }

    private getMessage (answer: string): Message {
      return {
        content: answer,
        author: { bot: false },
        channel: {
          send: (content: string): Promise<Message> => {
            console.log('出力: ' + content)
            return new Promise<Message>((resolve) => { resolve({} as Message) })
          }
        }
      } as Message
    }
  }
}
