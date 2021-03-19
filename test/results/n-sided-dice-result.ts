import assert from 'assert'
import 'reflect-metadata'
import { NSidedDiceResult } from '../../src/results'

describe('NSidedDiceResult', () => {
  const diceResult = new NSidedDiceResult(
    [4, 5], [2, 1], [3, 6], [7, 8]
  )
  const emptyResult = new NSidedDiceResult([], [], [], [])

  describe('#toString()', () => {
    it('Number of dice is the total number of times', () => {
      assert.strictEqual(diceResult.toString(), ':black_circle: + ( 4 + 5 ) - ( 2 + 1 ) + ( 3 + 6 ) - ( 7 + 8 ) = 0')
    })

    it('Empty Dices', () => {
      assert.strictEqual(emptyResult.toString(), ':black_circle: = 0')
    })
  })
})
