import { injectable } from 'tsyringe'

export class Command {
  addDices: string[];
  subDices: string[];

  constructor () {
    this.addDices = []
    this.subDices = []
  }
}

@injectable()
export class MessageParser {
  run (input: string): Command {
    const args = input.split(/ +/)
    const command = new Command()
    let symbol = '+'

    args.forEach(arg => {
      switch (true) {
        case /^\d+d\d+$/.test(arg):
          if (symbol === '+') command.addDices.push(arg)
          if (symbol === '-') command.subDices.push(arg)
          break
        case /\+/.test(arg):
          symbol = '+'
          break
        case /-/.test(arg):
          symbol = '-'
          break
        default:
      }
    })

    return command
  }
}
