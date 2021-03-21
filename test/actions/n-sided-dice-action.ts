import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { BadCommandError, WrongFormulaError } from '../../src/@error'
import { NSidedDiceAction } from '../../src/actions'
import { NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceAction', () => {
  const action = container.resolve(NSidedDiceAction)

  describe('#parse()', () => {
    it('Additional dice', () => {
      assert.deepStrictEqual(action.parse('1d100'), new NSidedDiceCommand(['1d100']))
      assert.deepStrictEqual(action.parse('1d100 + 1d6'), new NSidedDiceCommand(['1d100', '+', '1d6']))
    })

    it('Reduction dice', () => {
      assert.deepStrictEqual(action.parse('- 1d100'), new NSidedDiceCommand(['-', '1d100']))
      assert.deepStrictEqual(action.parse('- 1d100 - 1d6'), new NSidedDiceCommand(['-', '1d100', '-', '1d6']))
    })

    it('Composite dice', () => {
      assert.deepStrictEqual(action.parse('1d100 - 1d6'), new NSidedDiceCommand(['1d100', '-', '1d6']))
    })

    it('Additional number', () => {
      assert.deepStrictEqual(action.parse('+ 5'), new NSidedDiceCommand(['+', '5']))
      assert.deepStrictEqual(action.parse('5 + 7'), new NSidedDiceCommand(['5', '+', '7']))
    })

    it('Reduction number', () => {
      assert.deepStrictEqual(action.parse('- 8'), new NSidedDiceCommand(['-', '8']))
      assert.deepStrictEqual(action.parse('- 8 - 11'), new NSidedDiceCommand(['-', '8', '-', '11']))
    })

    it('Composite number', () => {
      assert.deepStrictEqual(action.parse('100 - 6'), new NSidedDiceCommand(['100', '-', '6']))
    })

    it('All', () => {
      assert.deepStrictEqual(
        action.parse('2d6 - 1d3 + 10 - 7'),
        new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7'])
      )
    })

    it('Throw exception.', () => {
      assert.throws(() => { action.parse('') }, BadCommandError)
      assert.throws(() => { action.parse('ダイスの駄女神') }, WrongFormulaError)
    })
  })

  describe('#cast()', () => {
    it('All', () => {
      const expected = new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7'])
      assert.doesNotThrow(() => { action.cast(expected) })
    })
  })
})
