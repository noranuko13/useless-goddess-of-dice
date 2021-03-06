import assert from 'assert'
import 'reflect-metadata'
import { NotFoundError, ReplyError } from '../../src/@error'

describe('NotFoundError', function () {
  describe('Handle exceptions.', function () {
    it('Handle NotFoundError', function () {
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

    it('Handle ReplyError', function () {
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
