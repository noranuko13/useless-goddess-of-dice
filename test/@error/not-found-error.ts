import assert from 'assert'
import 'reflect-metadata'
import { NotFoundError, ReplyError } from '../../src/@error'

describe('NotFoundError', () => {
  describe('Handle exceptions', () => {
    it('Handle NotFoundError', () => {
      let actual: Error = new Error('')
      const fn = () => {
        throw new NotFoundError()
      }

      try {
        fn()
      } catch (error) {
        if (error instanceof NotFoundError) {
          actual = error
        }
      }

      assert.strictEqual(actual.name, 'NotFoundError')
      assert.strictEqual(actual.message, '疲れてるの？(´・д・)引数がないの・・・')
    })

    it('Handle ReplyError', () => {
      let actual: Error = new Error('')
      const fn = () => {
        throw new NotFoundError()
      }

      try {
        fn()
      } catch (error) {
        if (error instanceof ReplyError) {
          actual = error
        }
      }

      assert.strictEqual(actual.name, 'NotFoundError')
      assert.strictEqual(actual.message, '疲れてるの？(´・д・)引数がないの・・・')
    })
  })
})
