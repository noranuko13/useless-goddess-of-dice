import assert from 'assert'
import { Message } from 'discord.js'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { MessageService } from '../../src/@service'

describe('MessageService', function () {
  let service: MessageService
  const message: Message = { author: {} } as Message

  beforeEach(function () {
    service = container.resolve(MessageService)
  })

  describe('#isValid()', function () {
    it('The message is valid', function () {
      message.content = '/ugd 2d6 + 6'
      message.author.bot = false
      assert.strictEqual(service.isValid(message), true)
    })

    it('The message is invalid', function () {
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
