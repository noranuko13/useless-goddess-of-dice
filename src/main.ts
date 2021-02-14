import 'reflect-metadata'
import { Config } from './config'
import { Client, DebugClient, DiscordClient } from './clients'
import { container } from 'tsyringe'
import { PlayerDiceRoller } from './rollers'

const client: Client = container.resolve(Config).isDebug()
  ? container.resolve(DebugClient)
  : container.resolve(DiscordClient)

const roller = container.resolve(PlayerDiceRoller)
client.waitInput(roller)
