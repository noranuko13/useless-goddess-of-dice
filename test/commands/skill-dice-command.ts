import assert from 'assert'
import 'reflect-metadata'
import { BadCommandError } from '../../src/@error'
import { SkillDiceCommand } from '../../src/commands'

describe('SkillDiceCommand', function () {
  describe('#cast(), #toString()', function () {
    it('BadCommandError', function () {
      assert.throws(() => { return new SkillDiceCommand(['SpotHidden', '80', ')']) }, BadCommandError)
    })

    it('SpotHidden(80)', function () {
      const command = new SkillDiceCommand(['SpotHidden', '(', '80', ')'])
      command.cast()
      assert.strictEqual(command.toString(), 'SpotHidden :black_circle: ( 80 ) = 80')
    })

    it('SpotHidden(60 + 2d6)', function () {
      const command = new SkillDiceCommand(['SpotHidden', '(', '60', '+', '2d6', ')'])
      command.cast()
      assert.strictEqual(/SpotHidden :black_circle: \( 60 \+ 2d6<[1-6],[1-6]> \) = \d+/.test(command.toString()), true)
    })
  })
})
