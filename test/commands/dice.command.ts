import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError } from '../../src/@error'
import { DiceCommand } from '../../src/commands'

describe('DiceCommand', function () {
  it('Create instance', function () {
    const d100 = new DiceCommand('1d100')
    assert.strictEqual(d100.getNdm(), '1d100')
    assert.strictEqual(d100.getTime(), 1)
    assert.strictEqual(d100.getSide(), 100)

    const d6 = new DiceCommand('2d6')
    assert.strictEqual(d6.getNdm(), '2d6')
    assert.strictEqual(d6.getTime(), 2)
    assert.strictEqual(d6.getSide(), 6)
  })

  it('Instance creation fails.', function () {
    const fn = (str: string) => {
      return new DiceCommand(str)
    }
    assert.throws(() => { fn('') }, BadCommandError)
    assert.throws(() => { fn('2d') }, BadCommandError)
    assert.throws(() => { fn('d6') }, BadCommandError)
  })
})
