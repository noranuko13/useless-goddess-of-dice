import assert from 'assert'
import 'reflect-metadata'
import { NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceCommand', function () {
  describe('#cast(), #toString()', function () {
    it('Number of dice is the total number of times', function () {
      const command = new NSidedDiceCommand(['1d100', '+', '2d6', '-', '1d100', '-', '2d6', '+', '6', '+', '3', '-', '6', '-', '3'])
      command.cast()
      assert.strictEqual(/:black_circle: 1d100<\d+> \+ 2d6<\d+,\d+> - 1d100<\d+> - 2d6<\d+,\d+> \+ 6 \+ 3 - 6 - 3 = -?\d+/.test(command.toString()), true)
    })
  })
})
