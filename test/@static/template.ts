import assert from 'assert'
import 'reflect-metadata'
import { Template } from '../../src/@static'

describe('Template', function () {
  describe('#messages()', function () {
    it('OK', function () {
      assert.strictEqual(Template.messages.error.badCommand, 'Bad command error!')
      assert.strictEqual(Template.messages.commands.choiceCommand, ':WORD:')
    })
  })
})
