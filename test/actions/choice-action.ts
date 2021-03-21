import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { NotFoundError } from '../../src/@error'
import { ChoiceAction } from '../../src/actions'

describe('ChoiceAction', () => {
  const action = container.resolve(ChoiceAction)

  describe('#parse()', () => {
    it('All', () => {
      assert.deepStrictEqual(
        JSON.stringify(action.parse('choice 餃子 カレー')),
        JSON.stringify({
          index: 0,
          words: ['餃子', 'カレー']
        }))
    })

    it('Other', () => {
      assert.throws(() => { action.parse('') }, NotFoundError)
    })
  })
})
