import { Config } from './config'
import { Client, DebugClient, DiscordClient } from './clients'

if (Config.isDebug()) {
  console.log('DEBUG MODE')
}

const fn = function (answer: string): string {
  return answer + answer
}

const client: Client = Config.isDebug() ? new DebugClient() : new DiscordClient()
client.waitInput(fn)
