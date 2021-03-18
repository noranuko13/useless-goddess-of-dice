import assert from 'assert'
import 'reflect-metadata'
import { ChoiceCommand } from '../../src/commands'

describe('ChoiceCommand', function () {
  describe('#getWords(), #getSide()', function () {
    it('String value', function () {
      const words: string[] = ['餃子', 'カレー']
      const command: ChoiceCommand = new ChoiceCommand(words)

      assert.deepStrictEqual(command.getWords(), words)
      assert.deepStrictEqual(command.getRange(), [0, words.length - 1])
    })
  })
})
