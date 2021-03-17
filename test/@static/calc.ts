import assert from 'assert'
import 'reflect-metadata'
import { Calc } from '../../src/@static'

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
})
