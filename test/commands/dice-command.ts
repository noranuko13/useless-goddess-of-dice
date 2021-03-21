import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError } from '../../src/@error'
import { DiceCommand } from '../../src/commands'

describe('DiceCommand', () => {
  it('Create instance', () => {
    assert.doesNotThrow(() => { return new DiceCommand('1d100') })
    assert.doesNotThrow(() => { return new DiceCommand('2d6') })
  })

  it('Instance creation fails', () => {
    const fn = (str: string) => {
      return new DiceCommand(str)
    }
    assert.throws(() => { fn('') }, BadCommandError)
    assert.throws(() => { fn('2d') }, BadCommandError)
    assert.throws(() => { fn('d6') }, BadCommandError)
  })
})
