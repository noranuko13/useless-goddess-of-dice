import assert from 'assert'
import 'reflect-metadata'
import { ChoiceCommand } from '../../src/commands'

describe('ChoiceCommand', function () {
  describe('#cast(), #toString()', function () {
    it('No duplication', function () {
      const command: ChoiceCommand = new ChoiceCommand(['Gyoza', 'Curry'])
      command.cast()
      assert.strictEqual(/:black_circle: (Gyoza|Curry)/.test(command.toString()), true)
    })
  })
})
