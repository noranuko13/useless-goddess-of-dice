import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError } from '../../src/@error'
import { DiceCommand, NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceCommand', () => {
  const command = new NSidedDiceCommand(['1d100', '+', '2d6', '-', '1d100', '-', '2d6', '+', '6', '+', '3', '-', '6', '-', '3'])

  describe('Create instance.', () => {
    it('String array value.', () => {
      assert.deepStrictEqual(
        JSON.stringify(new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7'])),
        JSON.stringify({
          addDices: [{ ndm: '2d6', time: 2, side: 6 }],
          subDices: [{ ndm: '1d3', time: 1, side: 3 }],
          addNumbers: [10],
          subNumbers: [7]
        })
      )
    })

    it('Throw exception.', () => {
      assert.throws(() => { return new NSidedDiceCommand(['']) }, BadCommandError)
    })
  })

  describe('#getAddDices()', () => {
    it('String value', () => {
      assert.deepStrictEqual(command.getAddDices(), [new DiceCommand('1d100'), new DiceCommand('2d6')])
    })
  })

  describe('#getSubDices()', () => {
    it('String value', () => {
      assert.deepStrictEqual(command.getSubDices(), [new DiceCommand('1d100'), new DiceCommand('2d6')])
    })
  })

  describe('#getAddNumbers()', () => {
    it('String value', () => {
      assert.deepStrictEqual(command.getAddNumbers(), [6, 3])
    })
  })

  describe('#addSubNumber(), #getSubNumbers()', () => {
    it('String value', () => {
      assert.deepStrictEqual(command.getSubNumbers(), [6, 3])
    })
  })
})
