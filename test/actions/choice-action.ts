import assert from 'assert'
import 'reflect-metadata'
import { MessageEmbed } from 'discord.js'
import { container } from 'tsyringe'
import { NotFoundError } from '../../src/@error'
import { ChoiceAction } from '../../src/actions'
import { ChoiceCommand } from '../../src/commands'

describe('ChoiceAction', () => {
  const action = container.resolve(ChoiceAction)

  describe('#parse()', () => {
    it('All', () => {
      assert.deepStrictEqual(
        JSON.stringify(action.parse('choice 餃子 カレー')),
        JSON.stringify({
          words: ['餃子', 'カレー']
        }))
    })

    it('Other', () => {
      assert.throws(() => { action.parse('') }, NotFoundError)
    })
  })

  describe('#cast()', () => {
    it('All', () => {
      const expected = new ChoiceCommand(['餃子', 'カレー'])
      assert.doesNotThrow(() => { action.cast(expected) })
    })

    it('Empty ChoiceCommand', () => {
      const expected = new ChoiceCommand([])
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
