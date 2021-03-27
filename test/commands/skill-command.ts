import assert from 'assert'
import 'reflect-metadata'
import { SkillCommand } from '../../src/commands'

describe('SkillCommand', function () {
  describe('#cast(), #toString()', function () {
    it('3 目星(80) 聞き耳(30)  # クリティカル', function () {
      const command = new SkillCommand(['3', '目星', '(', '80', ')', '聞き耳', '(', '30', ')'])
      command.cast()
      const expected = ':black_circle: 3 = 3\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :star2: クリティカル！\n' +
        ' 　 聞き耳 :black_circle: ( 30 ) = 30 　 :star2: クリティカル！\n'
      assert.strictEqual(command.toString(), expected)
    })

    it('8 目星(80) 聞き耳(30)  # スペシャル, 成功', function () {
      const command = new SkillCommand(['8', '目星', '(', '80', ')', '聞き耳', '(', '30', ')'])
      command.cast()
      const expected = ':black_circle: 8 = 8\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :dizzy: スペシャル！\n' +
        ' 　 聞き耳 :black_circle: ( 30 ) = 30 　 :green_circle: 成功！\n'
      assert.strictEqual(command.toString(), expected)
    })

    it('93 目星(80) 聞き耳(30)  # 失敗, 大失敗', function () {
      const command = new SkillCommand(['93', '目星', '(', '80', ')', '聞き耳', '(', '30', ')'])
      command.cast()
      const expected = ':black_circle: 93 = 93\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :red_circle: 失敗！\n' +
        ' 　 聞き耳 :black_circle: ( 30 ) = 30 　 :boom: 大失敗！\n'
      assert.strictEqual(command.toString(), expected)
    })

    it('97 目星(80) 聞き耳(30)  # クリティカル', function () {
      const command = new SkillCommand(['97', '目星', '(', '80', ')', '聞き耳', '(', '30', ')'])
      command.cast()
      const expected = ':black_circle: 97 = 97\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :octopus: ファンブル！\n' +
        ' 　 聞き耳 :black_circle: ( 30 ) = 30 　 :octopus: ファンブル！\n'
      assert.strictEqual(command.toString(), expected)
    })
  })
})
