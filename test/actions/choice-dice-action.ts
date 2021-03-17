import assert from 'assert'
import 'reflect-metadata'
import { MessageEmbed } from 'discord.js'
import { container } from 'tsyringe'
import { BadCommandError } from '../../src/@error'
import { ChoiceDiceAction } from '../../src/actions'
import { ChoiceDiceCommand } from '../../src/commands'

describe('ChoiceDiceAction', function () {
  const action = container.resolve(ChoiceDiceAction)

  describe('#parse()', function () {
    it('All', function () {
      assert.deepStrictEqual(
        JSON.stringify(action.parse('choice 餃子 カレー')),
        JSON.stringify({
          words: ['餃子', 'カレー']
        }))
    })

    it('Other', function () {
      assert.throws(() => { action.parse('') }, BadCommandError)
    })
  })

  describe('#cast()', function () {
    it('All', function () {
      const expected = new ChoiceDiceCommand(['餃子', 'カレー'])
      assert.doesNotThrow(() => { action.cast(expected) })
    })

    it('Empty ChoiceDiceCommand', function () {
      const expected = new ChoiceDiceCommand([])
      assert.doesNotThrow(() => { action.cast(expected) })
      assert.deepStrictEqual(
        JSON.stringify(action.cast(expected)),
        JSON.stringify(new MessageEmbed({
          description: ':black_circle: ( ＝Д＝)  ！'
        }))
      )
    })
  })
})
