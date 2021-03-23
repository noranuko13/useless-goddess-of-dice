import assert from 'assert'
import 'reflect-metadata'
import { WrongFormulaError } from '../../src/@error'
import { Formula } from '../../src/@static'

describe('Formula', function () {
  describe('#validate()', function () {
    it('OK', function () {
      assert.doesNotThrow(() => { Formula.validate('( 1 + 2)') })
    })

    it('NG', function () {
      assert.throws(() => { Formula.validate('( 1 + 2') }, WrongFormulaError)
      assert.throws(() => { Formula.validate('ダイスの駄女神') }, WrongFormulaError)
    })
  })
})
