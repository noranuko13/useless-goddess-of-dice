import assert from 'assert'
import 'reflect-metadata'
import { NSidedDiceResult } from '../../src/results'

describe('NSidedDiceResult', function () {
  const diceResult = new NSidedDiceResult(
    [4, 5], [2, 1], [3, 6], [7, 8]
  )
  const emptyResult = new NSidedDiceResult([], [], [], [])

  describe('#toString()', function () {
    it('Number of dice is the total number of times', function () {
      assert.strictEqual(diceResult.toString(), ':black_circle: + ( 4 + 5 ) - ( 2 + 1 ) + ( 3 + 6 ) - ( 7 + 8 ) = 0')
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.toString(), ':black_circle: = 0')
    })
  })

  describe('#total()', function () {
    it('Normal', function () {
      assert.strictEqual(diceResult.total(), 0)
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.total(), 0)
    })
  })
})
