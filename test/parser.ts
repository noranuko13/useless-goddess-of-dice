import 'reflect-metadata'
import assert from 'assert'
import { container } from 'tsyringe'
import { Command, MessageParser } from '../src/parser'

describe('MessageParser', function () {
  const parser = container.resolve(MessageParser)

  describe('#run()', function () {
    it('Additional dice', function () {
      const expected = new Command()
      expected.addDices.push('1d100')
      assert.deepStrictEqual(parser.run('1d100'), expected)

      expected.addDices.push('1d6')
      assert.deepStrictEqual(parser.run('1d100 1d6'), expected)
    })

    it('Reduction dice', function () {
      const expected = new Command()
      expected.subDices.push('1d100')
      assert.deepStrictEqual(parser.run('- 1d100'), expected)

      expected.subDices.push('1d6')
      assert.deepStrictEqual(parser.run('- 1d100 - 1d6'), expected)
    })

    it('Composite dice', function () {
      const expected = new Command()
      expected.addDices.push('1d100')
      expected.subDices.push('1d6')
      assert.deepStrictEqual(parser.run('1d100 - 1d6'), expected)
    })

    it('Other', function () {
      const expected = new Command()
      assert.deepStrictEqual(parser.run(''), expected)
      assert.deepStrictEqual(parser.run('ダイスの駄女神'), expected)
    })
  })
})
