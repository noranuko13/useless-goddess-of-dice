import { injectable } from 'tsyringe'
import { MessageConverter } from './converter'
import { Command, MessageParser } from './parser'

export interface DiceRoller {
  roll (text: string): string;
}

export abstract class AbstractDiceRoller implements DiceRoller {
  protected constructor (protected converter: MessageConverter, protected parser: MessageParser) {}

  roll (text: string): string {
    text = this.converter.run(text)
    const command = this.parser.run(text)
    return this.execute(command)
  }

  abstract execute (command: Command): string
}

@injectable()
export class PlayerDiceRoller extends AbstractDiceRoller {
  constructor (converter: MessageConverter, parser: MessageParser) {
    super(converter, parser)
  }

  execute (command: Command): string {
    return JSON.stringify(command)
  }
}
