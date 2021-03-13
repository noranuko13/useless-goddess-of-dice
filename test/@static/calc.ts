import assert from 'assert'
import 'reflect-metadata'
import { Calc } from '../../src/@static/calc'
import { NSidedDice } from '../../src/dices'

describe('Calc', function () {
  describe('#sumOfNumbers()', function () {
    it('Array with values.', function () {
      assert.strictEqual(Calc.sumOfNumbers([3, 6]), 9)
      assert.strictEqual(Calc.sumOfNumbers([7, 8]), 15)
    })

    it('Empty array.', function () {
      assert.strictEqual(Calc.sumOfNumbers([]), 0)
    })
  })

  describe('#sumOfNSidedDice()', function () {
    it('Array with values', function () {
      assert.strictEqual(Calc.sumOfNSidedDice([new NSidedDice(10, 4), new NSidedDice(6, 5)]), 9)
      assert.strictEqual(Calc.sumOfNSidedDice([new NSidedDice(3, 2), new NSidedDice(4, 1)]), 3)
    })

    it('Empty array.', function () {
      assert.strictEqual(Calc.sumOfNSidedDice([]), 0)
    })
  })
})
