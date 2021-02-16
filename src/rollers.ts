import { injectable } from 'tsyringe'
import { MessageConverter } from './converter'
import { Command, MessageParser } from './parser'

@injectable()
export class DiceRoller {
  constructor (protected converter: MessageConverter, protected parser: MessageParser) {}

  roll (text: string): string {
    text = this.converter.run(text)
    const command = this.parser.run(text)
    return this.execute(command)
  }

  execute (command: Command): string {
    return JSON.stringify(command)
  }
}
