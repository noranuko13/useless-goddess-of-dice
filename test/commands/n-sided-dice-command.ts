import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { DiceCommandInterface, NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceCommand', function () {
  const command = container.resolve(NSidedDiceCommand)

  describe('#addAddDice(), #getAddDices()', function () {
    it('String value', function () {
      command.addAddDice('1d100')
      assert.deepStrictEqual(command.getAddDices(), [{ time: 1, side: 100 }])
      command.addAddDice('2d6')
      assert.deepStrictEqual(command.getAddDices(), [{ time: 1, side: 100 }, { time: 2, side: 6 }])
    })
  })

  describe('#addSubDice(), #getSubDices()', function () {
    it('String value', function () {
      command.addSubDice('1d100')
      assert.deepStrictEqual(command.getSubDices(), [{ time: 1, side: 100 }])
      command.addSubDice('2d6')
      assert.deepStrictEqual(command.getSubDices(), [{ time: 1, side: 100 }, { time: 2, side: 6 }])
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

  describe('#createDiceCommand()', function () {
    it('Normal diceCommand', function () {
      assert.deepStrictEqual((command as any).createDiceCommand('1d100'), { time: 1, side: 100 } as DiceCommandInterface)
      assert.deepStrictEqual((command as any).createDiceCommand('2d6'), { time: 2, side: 6 } as DiceCommandInterface)
    })
  })
})
