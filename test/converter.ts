import 'reflect-metadata'
import assert from 'assert'
import { MessageConverter } from '../src/converter'
import { container } from 'tsyringe'
import { Config } from '../src/config'

describe('MessageConverter', function () {
  container.register(Config, {
    useValue: {
      getPrefix (): string {
        return '/ugd'
      }
    } as Config
  })
  const converter = container.resolve(MessageConverter) as any

  describe('#run()', function () {
    it('All in', function () {
      assert.strictEqual(converter.run('/ugd 1d100'), '1d100')
      assert.strictEqual(converter.run('/ugd 2d6 + 6'), '2d6 + 6')
      assert.strictEqual(converter.run('/ugd 2d6 -6'), '2d6 - 6')
    })
  })

  describe('#removeCommandPrefix()', function () {
    it('Remove prefix', function () {
      assert.strictEqual(converter.removeCommandPrefix('/ugd 1d100'), '1d100')
      assert.strictEqual(converter.removeCommandPrefix('/ugd 2d6 + 6'), '2d6 + 6')
      assert.strictEqual(converter.removeCommandPrefix('/sphinx 1d100'), '/sphinx 1d100')
    })

    it('Another prefix', function () {
      container.register(Config, {
        useValue: {
          getPrefix (): string {
            return '/prefix'
          }
        } as Config
      })
      const another = container.resolve(MessageConverter) as any

      assert.strictEqual(another.removeCommandPrefix('/prefix 1d100'), '1d100')
      assert.strictEqual(another.removeCommandPrefix('/prefix 2d6 + 6'), '2d6 + 6')
      assert.strictEqual(another.removeCommandPrefix('/ugd 1d100'), '/ugd 1d100')
      assert.strictEqual(another.removeCommandPrefix('/sphinx 1d100'), '/sphinx 1d100')
    })

    it('Other', function () {
      assert.strictEqual(converter.removeCommandPrefix(''), '')
      assert.strictEqual(converter.removeCommandPrefix('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#addWhitespaceToBothEnds()', function () {
    it('Addition symbol', function () {
      const expected = '/ugd 2d6 + 6'
      assert.strictEqual(converter.addWhitespaceToBothEnds('/ugd 2d6 +6'), expected)
      assert.strictEqual(converter.addWhitespaceToBothEnds('/ugd 2d6+ 6'), expected)
    })

    it('Subtraction symbol', function () {
      const expected = '/ugd 2d6 - 6'
      assert.strictEqual(converter.addWhitespaceToBothEnds('/ugd 2d6 -6'), expected)
      assert.strictEqual(converter.addWhitespaceToBothEnds('/ugd 2d6- 6'), expected)
    })

    it('Other', function () {
      assert.strictEqual(converter.addWhitespaceToBothEnds(''), '')
      assert.strictEqual(converter.addWhitespaceToBothEnds('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#removeDuplicateWhitespace()', function () {
    it('Extra space: Simple dice roll', function () {
      const expected = '/ugd 1d100'
      assert.strictEqual(converter.removeDuplicateWhitespace('/ugd 1d100'), expected)
      assert.strictEqual(converter.removeDuplicateWhitespace('  /ugd 1d100'), expected)
      assert.strictEqual(converter.removeDuplicateWhitespace('/ugd  1d100'), expected)
      assert.strictEqual(converter.removeDuplicateWhitespace('/ugd 1d100  '), expected)
    })

    it('Extra space: Complex dice roll', function () {
      const expected = '/ugd 2d6 + 6'
      assert.strictEqual(converter.removeDuplicateWhitespace('/ugd 2d6 + 6'), expected)
      assert.strictEqual(converter.removeDuplicateWhitespace('/ugd  2d6  +   6'), expected)
    })

    it('Other', function () {
      assert.strictEqual(converter.removeDuplicateWhitespace(''), '')
      assert.strictEqual(converter.removeDuplicateWhitespace('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#toHalfWidth()', function () {
    const UPPER_FULL = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
    const LOWER_FULL = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'

    const UPPER_HALF = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LOWER_HALF = 'abcdefghijklmnopqrstuvwxyz'
    const NUMBER = '0123456789'

    it('Already half-width', function () {
      assert.strictEqual(converter.toHalfWidth(UPPER_HALF), UPPER_HALF)
      assert.strictEqual(converter.toHalfWidth(LOWER_HALF), LOWER_HALF)
      assert.strictEqual(converter.toHalfWidth(NUMBER), NUMBER)
    })

    it('Full-width', function () {
      assert.strictEqual(converter.toHalfWidth(UPPER_FULL), UPPER_HALF)
      assert.strictEqual(converter.toHalfWidth(LOWER_FULL), LOWER_HALF)
    })

    it('Other', function () {
      assert.strictEqual(converter.toHalfWidth(''), '')
      assert.strictEqual(converter.toHalfWidth('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })
})
