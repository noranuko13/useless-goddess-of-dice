import 'reflect-metadata'
import assert from 'assert'
import { container } from 'tsyringe'
import { Command, DiceCommand, MessageParser } from '../src/parser'

describe('Command', function () {
  const command = container.resolve(Command) as any

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

    it('Other', function () {
      const expected = new Command()
      assert.deepStrictEqual(parser.run(''), expected)
      assert.deepStrictEqual(parser.run('ダイスの駄女神'), expected)
    })
  })
})
