import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { BadCommandError, NotFoundError } from '../../src/@error'
import { ResolverService } from '../../src/@service'
import { ChoiceCommand, NSidedDiceCommand } from '../../src/commands'

describe('ResolverService', function () {
  let resolver: ResolverService

  beforeEach(function () {
    resolver = container.resolve(ResolverService)
  })

  describe('#getCommand()', function () {
    it('NSidedDiceCommand', function () {
      assert.deepStrictEqual(resolver.getCommand('2d6 - 1d3 + 10 - 7'), new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7']))
    })

    it('ChoiceCommand', function () {
      assert.deepStrictEqual(resolver.getCommand('choice 男 女'), new ChoiceCommand(['男', '女']))
      assert.deepStrictEqual(resolver.getCommand('choice 餃子 カレー'), new ChoiceCommand(['餃子', 'カレー']))
    })

    it('NotFoundError, BadCommandError', function () {
      assert.throws(() => { resolver.getCommand('') }, NotFoundError)
      assert.throws(() => { resolver.getCommand('BadCommand') }, BadCommandError)
    })
  })
})
