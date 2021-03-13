import { Command } from '../commands'
import { Result } from '../results'

export interface Action {
  parse (content: string): Command;
  cast (command: Command): Result;
}
