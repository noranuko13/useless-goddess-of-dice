import { Command } from '../commands'
import { Result } from '../results'

export interface Service {
  parse (content: string): Command;
  cast (command: Command): Result;
}
