import assert from 'assert'
import 'reflect-metadata'
import { ChoiceDiceResult } from '../../src/results'

describe('ChoiceDiceResult', function () {
  const diceResult = new ChoiceDiceResult()

  describe('#setWords(), #toString()', function () {
    it('No duplication.', function () {
      const words: string[] = ['餃子', 'カレー']
      const expects = [':black_circle: ( ＝Д＝) 餃子 ！', ':black_circle: ( ＝Д＝) カレー ！']
      diceResult.setWords(words)
      assert.strictEqual(expects.includes(diceResult.toString()), true)
    })

    it('There is duplication.', function () {
      const words: string[] = ['男', '女', '男', 'オカマ']
      const expects = [':black_circle: ( ＝Д＝) 男 ！', ':black_circle: ( ＝Д＝) 女 ！',
        ':black_circle: ( ＝Д＝) オカマ ！']
      diceResult.setWords(words)
      assert.strictEqual(expects.includes(diceResult.toString()), true)
    })
  })
})
