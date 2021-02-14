import { Config } from './config'
import { Client, DebugClient, DiscordClient } from './clients'

const config = new Config()
if (config.isDebug()) {
  console.log('DEBUG MODE')
}

const fn = function (answer: string): string {
  return answer + answer
}

const client: Client = config.isDebug() ? new DebugClient() : new DiscordClient()
client.waitInput(fn)
