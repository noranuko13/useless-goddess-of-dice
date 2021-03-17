import { MessageEmbed } from 'discord.js'
import { Command } from '../commands'

export interface Action {
  parse (content: string): Command;
  cast (command: Command): MessageEmbed;
}
