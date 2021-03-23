import assert from 'assert'
import 'reflect-metadata'
import { ChoiceCommand } from '../../src/commands'

describe('ChoiceCommand', function () {
  describe('#cast(), #toString()', function () {
    it('No duplication', function () {
      const command: ChoiceCommand = new ChoiceCommand(['餃子', 'カレー'])
      command.cast()
      assert.strictEqual(/:black_circle: \( ＝Д＝\) (餃子|カレー) ！/.test(command.toString()), true)
    })
  })
})
