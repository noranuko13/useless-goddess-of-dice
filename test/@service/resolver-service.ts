import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { BadCommandError, NotFoundError } from '../../src/@error'
import { ResolverService } from '../../src/@service'
import { ChoiceAction, NSidedDiceAction } from '../../src/actions'

describe('ResolverService', function () {
  const resolver = container.resolve(ResolverService)

  describe('#getAction()', function () {
    it('NSidedDiceAction', function () {
      assert.strictEqual(resolver.getAction('1d100').constructor.name, NSidedDiceAction.name)
      assert.strictEqual(resolver.getAction('10').constructor.name, NSidedDiceAction.name)
      assert.strictEqual(resolver.getAction('+').constructor.name, NSidedDiceAction.name)
      assert.strictEqual(resolver.getAction('-').constructor.name, NSidedDiceAction.name)
    })

    it('ChoiceAction', function () {
      assert.strictEqual(resolver.getAction('choice 男 女').constructor.name, ChoiceAction.name)
    })

    it('NotFoundError, BadCommandError', function () {
      assert.throws(() => { resolver.getAction('') }, NotFoundError)

      assert.throws(() => { resolver.getAction('BadCommand') }, BadCommandError)
    })
  })
})
