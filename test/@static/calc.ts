import assert from 'assert'
import 'reflect-metadata'
import { Calc } from '../../src/@static'

describe('Calc', function () {
  describe('#sumOfNumbers()', function () {
    it('Array with values', function () {
      assert.strictEqual(Calc.sumOfNumbers([3, 6]), 9)
      assert.strictEqual(Calc.sumOfNumbers([7, 8]), 15)
    })

    it('Empty array', function () {
      assert.strictEqual(Calc.sumOfNumbers([]), 0)
    })
  })

  describe('#getIntByRange()', function () {
    it('Expected value that all eyes can see from 1 to 6: 14.7', function () {
      let numbers = []
      for (let i = 1; i <= 15; i++) {
        numbers.push(Calc.getIntByRange(1, 6))
      }
      numbers = numbers.filter(num => {
        return num < 1 || num > 15
      })
      assert.strictEqual(numbers.length, 0)
    })
  })
})
