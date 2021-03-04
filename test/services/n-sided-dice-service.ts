import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { NSidedDiceCommand } from '../../src/commands'
import { NSidedDiceResult } from '../../src/results'
import { NSidedDiceService } from '../../src/services'

describe('NSidedDiceService', function () {
  const service = container.resolve(NSidedDiceService)

  describe('#parse()', function () {
    it('Additional dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddDice('1d100')
      assert.deepStrictEqual(service.parse('1d100'), expected)

      expected.addAddDice('1d6')
      assert.deepStrictEqual(service.parse('1d100 1d6'), expected)
    })

    it('Reduction dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addSubDice('1d100')
      assert.deepStrictEqual(service.parse('- 1d100'), expected)

      expected.addSubDice('1d6')
      assert.deepStrictEqual(service.parse('- 1d100 - 1d6'), expected)
    })

    it('Composite dice', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddDice('1d100')
      expected.addSubDice('1d6')
      assert.deepStrictEqual(service.parse('1d100 - 1d6'), expected)
    })

    it('Additional number', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddNumber('5')
      assert.deepStrictEqual(service.parse('+ 5'), expected)

      expected.addAddNumber('7')
      assert.deepStrictEqual(service.parse('5 + 7'), expected)
    })

    it('Reduction number', function () {
      const expected = new NSidedDiceCommand()
      expected.addSubNumber('8')
      assert.deepStrictEqual(service.parse('- 8'), expected)

      expected.addSubNumber('11')
      assert.deepStrictEqual(service.parse('- 8 - 11'), expected)
    })

    it('Composite number', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddNumber('100')
      expected.addSubNumber('6')
      assert.deepStrictEqual(service.parse('100 - 6'), expected)
    })

    it('All', function () {
      assert.deepStrictEqual(
        JSON.stringify(service.parse('2d6 - 1d3 + 10 - 7')),
        JSON.stringify({
          addDices: [{ ndm: '2d6', time: 2, side: 6 }],
          subDices: [{ ndm: '1d3', time: 1, side: 3 }],
          addNumbers: [10],
          subNumbers: [7]
        }))
    })

    it('Other', function () {
      const expected = new NSidedDiceCommand()
      assert.deepStrictEqual(service.parse(''), expected)
      assert.deepStrictEqual(service.parse('ダイスの駄女神'), expected)
    })
  })

  describe('#cast()', function () {
    it('All', function () {
      const expected = new NSidedDiceCommand()
      expected.addAddDice('2d6')
      expected.addSubDice('1d3')
      expected.addAddNumber('10')
      expected.addSubNumber('7')
      assert.doesNotThrow(() => { service.cast(expected) })
    })

    it('Empty NSidedDiceCommand', function () {
      assert.doesNotThrow(() => { service.cast(new NSidedDiceCommand()) })
      assert.deepStrictEqual(
        JSON.stringify(service.cast(new NSidedDiceCommand())),
        JSON.stringify(new NSidedDiceResult())
      )
    })
  })
})
