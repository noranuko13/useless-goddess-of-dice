import assert from 'assert'
import 'reflect-metadata'
import { NSidedDice } from '../../src/dices/n-sided-dice'
import { NSidedDiceResult } from '../../src/results'

describe('NSidedDiceResult', function () {
  const diceResult = new NSidedDiceResult()
  diceResult.setAddDices([
    new NSidedDice(10, 4),
    new NSidedDice(6, 5)
  ])
  diceResult.setSubDices([
    new NSidedDice(3, 2),
    new NSidedDice(4, 1)
  ])
  diceResult.setAddNumbers([3, 6])
  diceResult.setSubNumbers([7, 8])

  const emptyResult = new NSidedDiceResult()

  describe('#toString()', function () {
    it('Number of dice is the total number of times', function () {
      assert.strictEqual(diceResult.toString(), '+ ( 4 + 5 ) - ( 2 + 1 ) + ( 3 + 6 ) - ( 7 + 8 ) = 0')
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.toString(), '')
    })
  })

  describe('#getTotal()', function () {
    it('Normal', function () {
      assert.strictEqual(diceResult.total(), 0)
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.total(), 0)
    })
  })
})
