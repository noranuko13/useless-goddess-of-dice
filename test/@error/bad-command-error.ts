import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError, ReplyError } from '../../src/@error'

describe('BadCommandError', function () {
  describe('Handle exceptions', function () {
    it('Handle ReplyError', function () {
      let actual: Error = new Error('')
      const fn = () => {
        throw new BadCommandError()
      }

      try {
        fn()
      } catch (error) {
        if (error instanceof ReplyError) {
          actual = error
        }
      }

      assert.strictEqual(actual.name, 'BadCommandError')
      assert.strictEqual(actual.message, 'Bad command error!')
    })
  })
})
