import { Command } from '../commands'
import { Result } from '../results'

export abstract class Service {
  abstract parse (content: string): Command;
  abstract cast (command: Command): Result;
}
