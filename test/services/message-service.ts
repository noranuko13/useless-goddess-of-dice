import assert from 'assert'
import { Message } from 'discord.js'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { Config } from '../../src/config'
import { MessageService } from '../../src/services'

describe('MessageService', function () {
  container.register(Config, {
    useValue: {
      getPrefix (): string {
        return '/ugd'
      }
    } as Config
  })
  const service = container.resolve(MessageService)

  const message: Message = { author: {} } as Message

  describe('#isValid()', function () {
    it('The message is valid.', function () {
      message.content = '/ugd 2d6 + 6'
      message.author.bot = false
      assert.strictEqual(service.isValid(message), true)
    })

    it('The message is invalid.', function () {
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
