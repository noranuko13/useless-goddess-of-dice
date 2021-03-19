import assert from 'assert'
import 'reflect-metadata'
import { ChoiceCommand } from '../../src/commands'

describe('ChoiceCommand', () => {
  describe('#getWords(), #getSide()', () => {
    it('String value', () => {
      const words: string[] = ['餃子', 'カレー']
      const command: ChoiceCommand = new ChoiceCommand(words)

      assert.deepStrictEqual(command.getWords(), words)
      assert.deepStrictEqual(command.getRange(), [0, words.length - 1])
    })
  })
})
