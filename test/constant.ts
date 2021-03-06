import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError, NotFoundError } from '../src/@error'
import { Constant } from '../src/constant'
import DiceType = Constant.DiceType

describe('MessageService', function () {
  describe('#diceTypeOf()', function () {
    it('DiceType.NSidedDice', function () {
      assert.strictEqual(Constant.diceTypeOf('1d100'), DiceType.NSidedDice)
      assert.strictEqual(Constant.diceTypeOf('10'), DiceType.NSidedDice)
      assert.strictEqual(Constant.diceTypeOf('+'), DiceType.NSidedDice)
      assert.strictEqual(Constant.diceTypeOf('-'), DiceType.NSidedDice)
    })

    it('NotFoundError, BadCommandError', function () {
      assert.throws(() => { Constant.diceTypeOf('') }, NotFoundError)

      assert.throws(() => { Constant.diceTypeOf('BadCommand') }, BadCommandError)
    })
  })
})
