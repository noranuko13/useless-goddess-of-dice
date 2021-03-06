import assert from 'assert'
import 'reflect-metadata'
import { NSidedDice } from '../../src/dices/n-sided-dice'
import { NSidedDiceResult } from '../../src/results'

describe('NSidedDiceResult', function () {
  const dr = new NSidedDiceResult()
  dr.setAddDices([
    new NSidedDice(10, 4),
    new NSidedDice(6, 5)
  ])
  dr.setSubDices([
    new NSidedDice(3, 2),
    new NSidedDice(4, 1)
  ])
  dr.setAddNumbers([3, 6])
  dr.setSubNumbers([7, 8])
  const diceResult = dr as any

  const emptyResult = new NSidedDiceResult() as any

  describe('#toString()', function () {
    it('Number of dice is the total number of times', function () {
      assert.strictEqual(diceResult.toString(), '+ ( 4 + 5 ) - ( 2 + 1 ) + ( 3 + 6 ) - ( 7 + 8 ) = 0')
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.toString(), '')
    })
  })

  describe('#toStringDices()', function () {
    it('Normal', function () {
      assert.deepStrictEqual(
        diceResult.toStringDices('+', diceResult.addDices),
        ['+', '(', '4 + 5', ')']
      )
      assert.deepStrictEqual(
        diceResult.toStringDices('-', diceResult.subDices),
        ['-', '(', '2 + 1', ')']
      )
    })

    it('Empty Dices', function () {
      assert.deepStrictEqual(emptyResult.toStringDices('+', []), [])
    })
  })

  describe('#toStringNumbers()', function () {
    it('Normal', function () {
      assert.deepStrictEqual(
        diceResult.toStringNumbers('+', diceResult.addNumbers),
        ['+', '(', '3 + 6', ')']
      )
      assert.deepStrictEqual(
        diceResult.toStringNumbers('-', diceResult.subNumbers),
        ['-', '(', '7 + 8', ')']
      )
    })

    it('Empty Numbers', function () {
      assert.deepStrictEqual(emptyResult.toStringNumbers('+', []), [])
    })
  })

  describe('#getTotal()', function () {
    it('Normal', function () {
      assert.strictEqual(diceResult.getTotal(), 0)
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.getTotal(), 0)
    })
  })
})
