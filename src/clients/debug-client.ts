import { injectable } from 'tsyringe'
import { DiceRoller } from '../rollers'
import readline from 'readline'
import { ClientInterface } from '../clients'
import { Config } from '../config'

@injectable()
export class DebugClient implements ClientInterface {
  constructor (private config: Config, private roller: DiceRoller) {}

  rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  waitInput (): void {
    this.rl.question('入力: ', (answer) => {
      if (!this.isValid(answer)) {
        return
      }

      const content = this.roller.roll(answer)
      console.log('出力: ' + content)
      this.waitInput()
    })
  };

  private isValid (content: string): boolean {
    return content.startsWith(this.config.getPrefix())
  }
}
