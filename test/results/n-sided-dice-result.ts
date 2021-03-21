import assert from 'assert'
import 'reflect-metadata'
import { NSidedDiceResult } from '../../src/results'

describe('NSidedDiceResult', () => {
  const diceResult = new NSidedDiceResult(
    ['1d100<99>', '+', '2d6<1,6>', '-', '1d100<4>', '-', '2d6<5,4>', '+', '6', '+', '3', '-', '6', '-', '3'], 93
  )
  const emptyResult = new NSidedDiceResult([], 0)

  describe('#toString()', () => {
    it('Number of dice is the total number of times', () => {
      assert.strictEqual(diceResult.toString(), ':black_circle: 1d100<99> + 2d6<1,6> - 1d100<4> - 2d6<5,4> + 6 + 3 - 6 - 3 = 93')
    })

    it('Empty Dices', () => {
      assert.strictEqual(emptyResult.toString(), ':black_circle: = 0')
    })
  })
})
