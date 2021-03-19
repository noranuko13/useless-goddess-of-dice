import assert from 'assert'
import 'reflect-metadata'
import { ChoiceResult } from '../../src/results'

describe('ChoiceResult', () => {
  describe('#setWords(), #toString()', () => {
    it('No duplication.', () => {
      const diceResult = new ChoiceResult('餃子')
      assert.strictEqual(diceResult.toString(), ':black_circle: ( ＝Д＝) 餃子 ！')
    })
  })
})
