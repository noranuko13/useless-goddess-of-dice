import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { NSidedDiceCommand } from '../src/commands'
import { NSidedDiceParser } from '../src/parser'

describe('NSidedDiceParser', function () {
  const parser = container.resolve(NSidedDiceParser)

  describe('#run()', function () {
    it('Additional dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddDice('1d100')
      assert.deepStrictEqual(parser.run('1d100'), expected)

      expected.addAddDice('1d6')
      assert.deepStrictEqual(parser.run('1d100 1d6'), expected)
    })

    it('Reduction dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addSubDice('1d100')
      assert.deepStrictEqual(parser.run('- 1d100'), expected)

      expected.addSubDice('1d6')
      assert.deepStrictEqual(parser.run('- 1d100 - 1d6'), expected)
    })

    it('Composite dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddDice('1d100')
      expected.addSubDice('1d6')
      assert.deepStrictEqual(parser.run('1d100 - 1d6'), expected)
    })

    it('Additional dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddNumber('5')
      assert.deepStrictEqual(parser.run('+ 5'), expected)

      expected.addAddNumber('7')
      assert.deepStrictEqual(parser.run('5 + 7'), expected)
    })

    it('Reduction dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addSubNumber('8')
      assert.deepStrictEqual(parser.run('- 8'), expected)

      expected.addSubNumber('11')
      assert.deepStrictEqual(parser.run('- 8 - 11'), expected)
    })

    it('Composite dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddNumber('100')
      expected.addSubNumber('6')
      assert.deepStrictEqual(parser.run('100 - 6'), expected)
    })

    it('Other', function () {
      const expected = new NSidedDiceCommand()
      assert.deepStrictEqual(parser.run(''), expected)
      assert.deepStrictEqual(parser.run('ダイスの駄女神'), expected)
    })
  })
})
