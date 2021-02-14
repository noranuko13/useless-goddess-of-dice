import { injectable } from 'tsyringe'
import { MessageConverter } from './converter'
import { Command, MessageParser } from './parser'

export interface DiceRoller {
  roll (text: string): string;
}

export abstract class AbstractDiceRoller implements DiceRoller {
  protected converter: MessageConverter
  protected parser: MessageParser

  protected constructor (converter: MessageConverter, parser: MessageParser) {
    this.converter = converter
    this.parser = parser
  }

  roll (text: string): string {
    text = this.converter.run(text)
    const command = this.parser.run(text)
    return this.execute(command)
  }

  abstract execute (command: Command): string
}

@injectable()
export class PlayerDiceRoller extends AbstractDiceRoller {
  // eslint-disable-next-line no-useless-constructor
  constructor (converter: MessageConverter, parser: MessageParser) {
    super(converter, parser)
  }

  execute (command: Command): string {
    return JSON.stringify(command)
  }
}
