import assert from 'assert'
import 'reflect-metadata'
import { NotFoundError, ReplyError } from '../../src/@error'

describe('NotFoundError', function () {
  describe('Handle exceptions', function () {
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
      assert.strictEqual(actual.message, 'Not found error!')
    })
  })
})
