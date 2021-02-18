import 'reflect-metadata'
import { Config } from './config'
import { ClientInterface, DebugClient, DiscordClient } from './clients'
import { container } from 'tsyringe'

const client: ClientInterface = container.resolve(Config).isDebug()
  ? container.resolve(DebugClient)
  : container.resolve(DiscordClient)

client.waitInput()
