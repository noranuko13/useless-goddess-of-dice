import assert from 'assert'
import 'reflect-metadata'
import { ReplyError, WrongFormulaError } from '../../src/@error'

describe('WrongFormulaError', function () {
  describe('Handle exceptions', function () {
    it('Handle ReplyError', function () {
      let actual: Error = new Error('')
      const fn = () => {
        throw new WrongFormulaError('WrongFormulaError')
      }

      try {
        fn()
      } catch (error) {
        if (error instanceof ReplyError) {
          actual = error
        }
      }

      assert.strictEqual(actual.name, 'WrongFormulaError')
      assert.strictEqual(actual.message, 'Wrong formula: WrongFormulaError')
    })
  })
})
