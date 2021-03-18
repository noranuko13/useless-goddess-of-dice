import assert from 'assert'
import 'reflect-metadata'
import { MessageEmbed } from 'discord.js'
import { container } from 'tsyringe'
import { BadCommandError } from '../../src/@error'
import { NSidedDiceAction } from '../../src/actions'
import { NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceAction', function () {
  const action = container.resolve(NSidedDiceAction)

  describe('#parse()', function () {
    it('Additional dice', function () {
      assert.deepStrictEqual(action.parse('1d100'), new NSidedDiceCommand(['1d100']))
      assert.deepStrictEqual(action.parse('1d100 1d6'), new NSidedDiceCommand(['1d100', '1d6']))
    })

    it('Reduction dice', function () {
      assert.deepStrictEqual(action.parse('- 1d100'), new NSidedDiceCommand(['-', '1d100']))
      assert.deepStrictEqual(action.parse('- 1d100 - 1d6'), new NSidedDiceCommand(['-', '1d100', '-', '1d6']))
    })

    it('Composite dice', function () {
      assert.deepStrictEqual(action.parse('1d100 - 1d6'), new NSidedDiceCommand(['1d100', '-', '1d6']))
    })

    it('Additional number', function () {
      assert.deepStrictEqual(action.parse('+ 5'), new NSidedDiceCommand(['5']))
      assert.deepStrictEqual(action.parse('5 + 7'), new NSidedDiceCommand(['5', '+', '7']))
    })

    it('Reduction number', function () {
      assert.deepStrictEqual(action.parse('- 8'), new NSidedDiceCommand(['-', '8']))
      assert.deepStrictEqual(action.parse('- 8 - 11'), new NSidedDiceCommand(['-', '8', '-', '11']))
    })

    it('Composite number', function () {
      assert.deepStrictEqual(action.parse('100 - 6'), new NSidedDiceCommand(['100', '-', '6']))
    })

    it('All', function () {
      assert.deepStrictEqual(
        action.parse('2d6 - 1d3 + 10 - 7'),
        new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7'])
      )
    })

    it('Throw exception.', function () {
      assert.throws(() => { action.parse('') }, BadCommandError)
      assert.throws(() => { action.parse('ダイスの駄女神') }, BadCommandError)
    })
  })

  describe('#cast()', function () {
    it('All', function () {
      const expected = new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7'])
      assert.doesNotThrow(() => { action.cast(expected) })
    })

    it('Empty NSidedDiceCommand', function () {
      assert.doesNotThrow(() => { action.cast(new NSidedDiceCommand([])) })
      assert.deepStrictEqual(
        JSON.stringify(action.cast(new NSidedDiceCommand([]))),
        JSON.stringify(new MessageEmbed({
          description: ':black_circle: = 0'
        }))
      )
    })
  })
})
