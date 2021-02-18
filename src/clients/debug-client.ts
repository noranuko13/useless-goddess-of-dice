import { injectable } from 'tsyringe'
import { DiceRoller } from '../rollers'
import readline from 'readline'
import { ClientInterface } from '../clients'

@injectable()
export class DebugClient implements ClientInterface {
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
