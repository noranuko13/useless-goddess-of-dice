import readline from 'readline'
import { injectable } from 'tsyringe'
import { DiceRoller } from '../rollers'
import { ClientInterface } from '../clients'
import { Config } from '../config'
import { Message } from 'discord.js'
import { MessageService } from '../services'

@injectable()
export class DebugClient implements ClientInterface {
  constructor (private config: Config, private ms: MessageService, private roller: DiceRoller) {}

  waitInput (): void {
    const client = new Client()

    client.on((message: Message) => {
      if (!this.ms.isValid(message)) {
        return
      }

      const content = this.roller.roll(message.content)
      message.channel.send(content).then()
    })
  }
}

class Client {
  private rl: readline.Interface;

  constructor () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })
  }

  public on (fn: (message: Message) => void) {
    this.rl.question('入力: ', (answer: string) => {
      const message = this.getMessage(answer)

      fn(message)

      this.on(fn)
    })
  }

  private getMessage (answer: string): Message {
    return {
      content: answer,
      author: { bot: false },
      channel: {
        send: (content: string) => {
          console.log('出力: ' + content)
          return new Promise((resolve) => { resolve(null) })
        }
      }
    } as Message
  }
}
