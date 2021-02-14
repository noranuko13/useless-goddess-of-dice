import assert from 'assert'
import { MessageConverter } from '../src/converter'

describe('MessageConverter', function () {
  describe('#toHalfWidth()', function () {
    const UPPER_FULL = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
    const LOWER_FULL = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'

    const UPPER_HALF = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LOWER_HALF = 'abcdefghijklmnopqrstuvwxyz'
    const NUMBER = '0123456789'

    it('Already half-width', function () {
      assert.strictEqual(MessageConverter.toHalfWidth(UPPER_HALF), UPPER_HALF)
      assert.strictEqual(MessageConverter.toHalfWidth(LOWER_HALF), LOWER_HALF)
      assert.strictEqual(MessageConverter.toHalfWidth(NUMBER), NUMBER)
    })

    it('Full-width', function () {
      assert.strictEqual(MessageConverter.toHalfWidth(UPPER_FULL), UPPER_HALF)
      assert.strictEqual(MessageConverter.toHalfWidth(LOWER_FULL), LOWER_HALF)
    })

    it('Other', function () {
      assert.strictEqual(MessageConverter.toHalfWidth(''), '')
      assert.strictEqual(MessageConverter.toHalfWidth('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })
})
