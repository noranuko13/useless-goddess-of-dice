import '../../src/@extension/array.extensions'
import assert from 'assert'
import 'reflect-metadata'
import { NSidedDice } from '../../src/dices/n-sided-dice'

describe('Array Extension', function () {
  describe('[].typeofNumber()', function () {
    it('Valid array.', function () {
      assert.strictEqual([1, 2, 3].typeofNumber(), true)
      assert.strictEqual([].typeofNumber(), true)
    })

    it('Invalid array.', function () {
      assert.strictEqual((['1', '2', '3'] as any).typeofNumber(), false)
      assert.strictEqual(([1, 2, '3'] as any).typeofNumber(), false)
    })
  })

  describe('[].typeofNSidedDice()', function () {
    it('Valid array.', function () {
      assert.strictEqual([new NSidedDice(10, 4), new NSidedDice(6, 5)].instanceofNSidedDice(), true)
      assert.strictEqual([].instanceofNSidedDice(), true)
    })

    it('Invalid array.', function () {
      assert.strictEqual(([1, 2, '3'] as any).instanceofNSidedDice(), false)
      assert.strictEqual(([new NSidedDice(10, 4), 2] as any).instanceofNSidedDice(), false)
    })
  })

  describe('NSidedDice[].total()', function () {
    it('Normal', function () {
      assert.strictEqual([new NSidedDice(10, 4), new NSidedDice(6, 5)].total(), 9)
      assert.strictEqual([new NSidedDice(3, 2), new NSidedDice(4, 1)].total(), 3)
    })

    it('Empty NSidedDices', function () {
      assert.strictEqual([].total(), 0)
    })
  })

  describe('number[].total()', function () {
    it('Normal', function () {
      assert.strictEqual([3, 6].total(), 9)
      assert.strictEqual([7, 8].total(), 15)
    })

    it('Empty Numbers', function () {
      assert.strictEqual([].total(), 0)
    })
  })
})
