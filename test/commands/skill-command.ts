import assert from 'assert'
import 'reflect-metadata'
import { SkillCommand } from '../../src/commands'

describe('SkillCommand', function () {
  describe('#cast(), #toString()', function () {
    // 目星(80)   [ 5, 16, 80, 96 ]
    // 聞き耳(40) [ 5,  8, 40, 96 ]

    it('3 目星(80) 聞き耳(40)  # Critical', function () {
      const command = new SkillCommand(['3', '目星', '(', '80', ')', '聞き耳', '(', '40', ')'])
      command.cast()
      const expected = ':black_circle: 3 = 3\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :star2: Critical!\n' +
        ' 　 聞き耳 :black_circle: ( 40 ) = 40 　 :star2: Critical!\n'
      assert.strictEqual(command.toString(), expected)
    })

    it('10 目星(80) 聞き耳(40)  # Special, Success', function () {
      const command = new SkillCommand(['10', '目星', '(', '80', ')', '聞き耳', '(', '40', ')'])
      command.cast()
      const expected = ':black_circle: 10 = 10\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :dizzy: Special!\n' +
        ' 　 聞き耳 :black_circle: ( 40 ) = 40 　 :green_circle: Success!\n'
      assert.strictEqual(command.toString(), expected)
    })

    it('90 目星(80) 聞き耳(40)  # Failure', function () {
      const command = new SkillCommand(['90', '目星', '(', '80', ')', '聞き耳', '(', '40', ')'])
      command.cast()
      const expected = ':black_circle: 90 = 90\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :red_circle: Failure!\n' +
        ' 　 聞き耳 :black_circle: ( 40 ) = 40 　 :red_circle: Failure!\n'
      assert.strictEqual(command.toString(), expected)
    })

    it('97 目星(80) 聞き耳(40)  # Fumble', function () {
      const command = new SkillCommand(['97', '目星', '(', '80', ')', '聞き耳', '(', '40', ')'])
      command.cast()
      const expected = ':black_circle: 97 = 97\n' +
        ' 　 目星 :black_circle: ( 80 ) = 80 　 :octopus: Fumble!\n' +
        ' 　 聞き耳 :black_circle: ( 40 ) = 40 　 :octopus: Fumble!\n'
      assert.strictEqual(command.toString(), expected)
    })
  })
})
