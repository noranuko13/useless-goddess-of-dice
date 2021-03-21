import { Command } from '../commands'

export interface Action {
  parse (content: string): Command;
}
