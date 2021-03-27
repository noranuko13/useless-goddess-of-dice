import assert from 'assert'
import 'reflect-metadata'
import { Template } from '../../src/@static'

describe('Template', function () {
  describe('#common()', function () {
    it('OK', function () {
      assert.strictEqual(Template.common.levels.critical, ':star2: クリティカル！')
      assert.strictEqual(Template.common.levels.fumble, ':octopus: ファンブル！')
    })
  })

  describe('#messages()', function () {
    it('OK', function () {
      assert.strictEqual(Template.messages.error.badCommand, '駄女神わかんにゃーい(´・ω・)')
      assert.strictEqual(Template.messages.commands.choiceCommand, '( ＝Д＝) :WORD: ！')
    })
  })
})
