import discord from 'discord.js'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { Config } from './config'
import { debug } from './debug'
import { Kernel } from './kernel'

const client: discord.Client = container.resolve(Config).isDebug()
  ? new debug.Client()
  : new discord.Client()

container.resolve(Kernel).waitInput(client)
