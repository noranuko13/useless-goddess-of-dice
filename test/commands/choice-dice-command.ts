import assert from 'assert'
import 'reflect-metadata'
import { ChoiceDiceCommand } from '../../src/commands'

describe('ChoiceDiceCommand', function () {
  describe('#getWords(), #getSide()', function () {
    it('String value', function () {
      const words: string[] = ['餃子', 'カレー']
      const command: ChoiceDiceCommand = new ChoiceDiceCommand(words)

      assert.deepStrictEqual(command.getWords(), words)
      assert.deepStrictEqual(command.getRange(), [0, words.length - 1])
    })
  })
})
