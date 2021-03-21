import assert from 'assert'
import { Message } from 'discord.js'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { MessageService } from '../../src/@service'
import { Config } from '../../src/config'

describe('MessageService', () => {
  container.register(Config, {
    useValue: {
      getPrefix (): string {
        return '/ugd'
      }
    } as Config
  })
  const service = container.resolve(MessageService)

  const message: Message = { author: {} } as Message

  describe('#isValid()', () => {
    it('The message is valid', () => {
      message.content = '/ugd 2d6 + 6'
      message.author.bot = false
      assert.strictEqual(service.isValid(message), true)
    })

    it('The message is invalid', () => {
      message.content = '/prefix 2d6 + 6'
      message.author.bot = false
      assert.strictEqual(service.isValid(message), false)

      message.content = '/ugd 2d6 + 6'
      message.author.bot = true
      assert.strictEqual(service.isValid(message), false)

      message.content = '/prefix 2d6 + 6'
      message.author.bot = true
      assert.strictEqual(service.isValid(message), false)
    })
  })
})
