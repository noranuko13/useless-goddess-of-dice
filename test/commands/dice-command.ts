import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError } from '../../src/@error'
import { DiceCommand } from '../../src/commands'

describe('DiceCommand', function () {
  it('Create instance', function () {
    assert.doesNotThrow(() => { return new DiceCommand('1d100') })
    assert.doesNotThrow(() => { return new DiceCommand('2d6') })
  })

  it('Instance creation fails', function () {
    assert.throws(() => { return new DiceCommand('') }, BadCommandError)
    assert.throws(() => { return new DiceCommand('2d') }, BadCommandError)
    assert.throws(() => { return new DiceCommand('d6') }, BadCommandError)
  })

  describe('#cast(), #toString()', function () {
    it('No duplication', function () {
      const command: DiceCommand = new DiceCommand('1d100')
      command.cast()
      assert.strictEqual(/<\d+>/.test(command.toString()), true)
    })
  })
})
