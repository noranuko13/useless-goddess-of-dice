import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { DiceCommand, NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceCommand', function () {
  const command = container.resolve(NSidedDiceCommand)

  describe('#addAddDice(), #getAddDices()', function () {
    it('String value', function () {
      command.addAddDice('1d100')
      assert.deepStrictEqual(command.getAddDices(), [new DiceCommand('1d100')])
      command.addAddDice('2d6')
      assert.deepStrictEqual(command.getAddDices(), [new DiceCommand('1d100'), new DiceCommand('2d6')])
    })
  })

  describe('#addSubDice(), #getSubDices()', function () {
    it('String value', function () {
      command.addSubDice('1d100')
      assert.deepStrictEqual(command.getSubDices(), [new DiceCommand('1d100')])
      command.addSubDice('2d6')
      assert.deepStrictEqual(command.getSubDices(), [new DiceCommand('1d100'), new DiceCommand('2d6')])
    })
  })

  describe('#addAddNumber(), #getAddNumbers()', function () {
    it('String value', function () {
      command.addAddNumber('6')
      assert.deepStrictEqual(command.getAddNumbers(), [6])
      command.addAddNumber('3')
      assert.deepStrictEqual(command.getAddNumbers(), [6, 3])
    })
  })

  describe('#addSubNumber(), #getSubNumbers()', function () {
    it('String value', function () {
      command.addSubNumber('6')
      assert.deepStrictEqual(command.getSubNumbers(), [6])
      command.addSubNumber('3')
      assert.deepStrictEqual(command.getSubNumbers(), [6, 3])
    })
  })
})
