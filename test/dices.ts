import assert from 'assert'
import 'reflect-metadata'
import { NSidedDice } from '../src/dices'

describe('NSidedDice', function () {
  describe('#korokoro(), #getAddDices()', function () {
    it('Expected value that all eyes can see from 1 to 6: 14.7', function () {
      const nSidedDice = new NSidedDice(6)
      let numbers = []
      for (let i = 1; i <= 15; i++) {
        numbers.push((nSidedDice as any).korokoro())
      }
      numbers = numbers.filter(num => {
        return num < 1 || num > 15
      })
      assert.strictEqual(numbers.length, 0)
    })
  })
})
