import { Command } from '../commands'
import { DiceResult } from '../results'

export abstract class DiceService {
  abstract parse (content: string): Command;
  abstract cast (command: Command): DiceResult;
}
