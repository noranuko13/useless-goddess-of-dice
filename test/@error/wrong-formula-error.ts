import assert from 'assert'
import 'reflect-metadata'
import { ReplyError, WrongFormulaError } from '../../src/@error'

describe('WrongFormulaError', () => {
  describe('Handle exceptions', () => {
    it('Handle WrongFormulaError', () => {
      let actual: Error = new Error('')
      const fn = () => {
        throw new WrongFormulaError('WrongFormulaError')
      }

      try {
        fn()
      } catch (error) {
        if (error instanceof WrongFormulaError) {
          actual = error
        }
      }

      assert.strictEqual(actual.name, 'WrongFormulaError')
      assert.strictEqual(actual.message, '( 3ω3) < Hi! WrongFormulaError')
    })

    it('Handle ReplyError', () => {
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
      assert.strictEqual(actual.message, '( 3ω3) < Hi! WrongFormulaError')
    })
  })
})
