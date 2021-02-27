import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { Command, DiceCommand, MessageParser } from '../src/parser'

describe('Command', function () {
  const command = container.resolve(Command) as any

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

  describe('#createDiceCommand()', function () {
    it('Normal diceCommand', function () {
      assert.deepStrictEqual(command.createDiceCommand('1d100'), { time: 1, side: 100 } as DiceCommand)
      assert.deepStrictEqual(command.createDiceCommand('2d6'), { time: 2, side: 6 } as DiceCommand)
    })
  })
})

describe('MessageParser', function () {
  const parser = container.resolve(MessageParser)

  describe('#run()', function () {
    it('Additional dice', function () {
      const expected = new Command()
      expected.addAddDice('1d100')
      assert.deepStrictEqual(parser.run('1d100'), expected)

      expected.addAddDice('1d6')
      assert.deepStrictEqual(parser.run('1d100 1d6'), expected)
    })

    it('Reduction dice', function () {
      const expected = new Command()
      expected.addSubDice('1d100')
      assert.deepStrictEqual(parser.run('- 1d100'), expected)

      expected.addSubDice('1d6')
      assert.deepStrictEqual(parser.run('- 1d100 - 1d6'), expected)
    })

    it('Composite dice', function () {
      const expected = new Command()
      expected.addAddDice('1d100')
      expected.addSubDice('1d6')
      assert.deepStrictEqual(parser.run('1d100 - 1d6'), expected)
    })

    it('Additional dice', function () {
      const expected = new Command()
      expected.addAddNumber('5')
      assert.deepStrictEqual(parser.run('+ 5'), expected)

      expected.addAddNumber('7')
      assert.deepStrictEqual(parser.run('5 + 7'), expected)
    })

    it('Reduction dice', function () {
      const expected = new Command()
      expected.addSubNumber('8')
      assert.deepStrictEqual(parser.run('- 8'), expected)

      expected.addSubNumber('11')
      assert.deepStrictEqual(parser.run('- 8 - 11'), expected)
    })

    it('Composite dice', function () {
      const expected = new Command()
      expected.addAddNumber('100')
      expected.addSubNumber('6')
      assert.deepStrictEqual(parser.run('100 - 6'), expected)
    })

    it('Other', function () {
      const expected = new Command()
      assert.deepStrictEqual(parser.run(''), expected)
      assert.deepStrictEqual(parser.run('ダイスの駄女神'), expected)
    })
  })
})
