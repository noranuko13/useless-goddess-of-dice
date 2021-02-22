import { injectable } from 'tsyringe'
import { DiceRoller } from '../rollers'
import readline from 'readline'
import { ClientInterface } from '../clients'
import { Config } from '../config'

class Message {
  public content: string = '';
}

@injectable()
export class DebugClient implements ClientInterface {
  constructor (private config: Config, private roller: DiceRoller) {}

  rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  waitInput (): void {
    this.rl.question('入力: ', (answer: string) => {
      const message = {
        content: answer
      } as Message

      if (!this.isValid(message)) {
        return
      }

      this.output(message)

      this.waitInput()
    })
  };

  private output (message: Message): void {
    const content = this.roller.roll(message.content)
    console.log('出力: ' + content)
  }

  private isValid (message: Message): boolean {
    return message.content.startsWith(this.config.getPrefix())
  }
}
