import assert from 'assert'
import 'reflect-metadata'
import { ChoiceDiceResult } from '../../src/results'

describe('ChoiceDiceResult', function () {
  const diceResult = new ChoiceDiceResult()

  describe('#setWords(), #toString()', function () {
    it('No duplication.', function () {
      const words: string[] = ['餃子', 'カレー']
      const expects = ['( ＝Д＝) 餃子 ！', '( ＝Д＝) カレー ！']
      diceResult.setWords(words)
      console.log(diceResult.toString())
      assert.strictEqual(expects.includes(diceResult.toString()), true)
    })

    it('There is duplication.', function () {
      const words: string[] = ['男', '女', '男', 'オカマ']
      const expects = ['( ＝Д＝) 男 ！', '( ＝Д＝) 女 ！', '( ＝Д＝) オカマ ！']
      diceResult.setWords(words)
      assert.strictEqual(expects.includes(diceResult.toString()), true)
    })
  })
})
