import assert from 'assert'
import 'reflect-metadata'
import { WrongFormulaError } from '../../src/@error'
import { Formula } from '../../src/@static'

describe('Formula', () => {
  describe('#validate()', () => {
    it('OK', () => {
      assert.doesNotThrow(() => { Formula.validate('( 1 + 2)') })
    })

    it('NG', () => {
      assert.throws(() => { Formula.validate('( 1 + 2') }, WrongFormulaError)
      assert.throws(() => { Formula.validate('ダイスの駄女神') }, WrongFormulaError)
    })
  })
})
