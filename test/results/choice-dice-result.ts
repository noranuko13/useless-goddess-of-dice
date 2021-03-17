import assert from 'assert'
import 'reflect-metadata'
import { ChoiceDiceResult } from '../../src/results'

describe('ChoiceDiceResult', function () {
  describe('#setWords(), #toString()', function () {
    it('No duplication.', function () {
      const diceResult = new ChoiceDiceResult('餃子')
      assert.strictEqual(diceResult.toString(), ':black_circle: ( ＝Д＝) 餃子 ！')
    })
  })
})
