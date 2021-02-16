import 'reflect-metadata'
import { Config } from './config'
import { Client, DebugClient, DiscordClient } from './clients'
import { container } from 'tsyringe'

const client: Client = container.resolve(Config).isDebug()
  ? container.resolve(DebugClient)
  : container.resolve(DiscordClient)

client.waitInput()
