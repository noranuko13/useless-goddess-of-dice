import assert from 'assert'
import 'reflect-metadata'
import { ChoiceCommand } from '../../src/commands'

describe('ChoiceCommand', () => {
  const words: string[] = ['餃子', 'カレー']
  const command: ChoiceCommand = new ChoiceCommand(words)

  describe('#getWords(), #getRange()', () => {
    it('String value', () => {
      assert.deepStrictEqual(command.getWords(), words)
      assert.deepStrictEqual(command.getRange(), [0, words.length - 1])
    })
  })

  describe('#toString()', () => {
    it('No duplication', () => {
      assert.strictEqual(/:black_circle: \( ＝Д＝\) (餃子|カレー) ！/.test(command.toString()), true)
    })
  })
})
