import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError } from '../../src/@error'
import { DiceCommand } from '../../src/commands'

describe('DiceCommand', () => {
  it('Create instance', () => {
    const d100 = new DiceCommand('1d100')
    assert.strictEqual(d100.getNdm(), '1d100')
    assert.strictEqual(d100.getTime(), 1)
    assert.deepStrictEqual(d100.getRange(), [1, 100])

    const d6 = new DiceCommand('2d6')
    assert.strictEqual(d6.getNdm(), '2d6')
    assert.strictEqual(d6.getTime(), 2)
    assert.deepStrictEqual(d6.getRange(), [1, 6])
  })

  it('Instance creation fails.', () => {
    const fn = (str: string) => {
      return new DiceCommand(str)
    }
    assert.throws(() => { fn('') }, BadCommandError)
    assert.throws(() => { fn('2d') }, BadCommandError)
    assert.throws(() => { fn('d6') }, BadCommandError)
  })
})
