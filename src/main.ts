import 'reflect-metadata'
import { Config } from './config'
import { Client, DebugClient, DiscordClient } from './clients'
import { container } from 'tsyringe'

const config = container.resolve(Config)
if (config.isDebug()) {
  console.log('DEBUG MODE')
}

const fn = function (answer: string): string {
  return answer + answer
}

const client: Client = config.isDebug()
  ? new DebugClient()
  : container.resolve(DiscordClient)
client.waitInput(fn)
