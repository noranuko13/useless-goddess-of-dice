import 'reflect-metadata'
import { container } from 'tsyringe'
import { ClientInterface, DebugClient, DiscordClient } from './@client'
import { Config } from './config'

const client: ClientInterface = container.resolve(Config).isDebug()
  ? container.resolve(DebugClient)
  : container.resolve(DiscordClient)

client.waitInput()
