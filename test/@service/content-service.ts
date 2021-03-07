import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { ContentService } from '../../src/@service'
import { Config } from '../../src/config'

describe('ContentService', function () {
  container.register(Config, {
    useValue: {
      getPrefix (): string {
        return '/ugd'
      }
    } as Config
  })
  const cs = container.resolve(ContentService)

  describe('#removeCommandPrefix()', function () {
    it('Remove prefix', function () {
      assert.strictEqual(cs.removeCommandPrefix('/ugd 1d100'), '1d100')
      assert.strictEqual(cs.removeCommandPrefix('/ugd 2d6 + 6'), '2d6 + 6')
      assert.strictEqual(cs.removeCommandPrefix('/sphinx 1d100'), '/sphinx 1d100')
    })

    it('Another prefix', function () {
      container.register(Config, {
        useValue: {
          getPrefix (): string {
            return '/prefix'
          }
        } as Config
      })
      const another = container.resolve(ContentService) as any

      assert.strictEqual(another.removeCommandPrefix('/prefix 1d100'), '1d100')
      assert.strictEqual(another.removeCommandPrefix('/prefix 2d6 + 6'), '2d6 + 6')
      assert.strictEqual(another.removeCommandPrefix('/ugd 1d100'), '/ugd 1d100')
      assert.strictEqual(another.removeCommandPrefix('/sphinx 1d100'), '/sphinx 1d100')
    })

    it('Other', function () {
      assert.strictEqual(cs.removeCommandPrefix(''), '')
      assert.strictEqual(cs.removeCommandPrefix('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#addWhitespaceToBothEnds()', function () {
    it('Addition symbol', function () {
      const expected = '/ugd 2d6 + 6'
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6 +6'), expected)
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6+ 6'), expected)
    })

    it('Subtraction symbol', function () {
      const expected = '/ugd 2d6 - 6'
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6 -6'), expected)
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6- 6'), expected)
    })

    it('Other', function () {
      assert.strictEqual(cs.addWhitespaceToBothEnds(''), '')
      assert.strictEqual(cs.addWhitespaceToBothEnds('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#removeDuplicateWhitespace()', function () {
    it('Extra space: Simple dice roll', function () {
      const expected = '/ugd 1d100'
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd 1d100'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('  /ugd 1d100'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd  1d100'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd 1d100  '), expected)
    })

    it('Extra space: Complex dice roll', function () {
      const expected = '/ugd 2d6 + 6'
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd 2d6 + 6'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd  2d6  +   6'), expected)
    })

    it('Other', function () {
      assert.strictEqual(cs.removeDuplicateWhitespace(''), '')
      assert.strictEqual(cs.removeDuplicateWhitespace('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#toHalfWidth()', function () {
    const UPPER_FULL = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭ　ＮＯＰＱＲＳＴＵＶＷＸＹＺ'
    const LOWER_FULL = 'ａｂｃｄｅｆｇｈｉｊｋｌｍ　ｎｏｐｑｒｓｔｕｖｗｘｙｚ'
    const NUMBER_FULL = '０１２３４５６７８９'

    const UPPER_HALF = 'ABCDEFGHIJKLM NOPQRSTUVWXYZ'
    const LOWER_HALF = 'abcdefghijklm nopqrstuvwxyz'
    const NUMBER_HALF = '0123456789'

    it('Already half-width', function () {
      assert.strictEqual(cs.toHalfWidth(UPPER_HALF), UPPER_HALF)
      assert.strictEqual(cs.toHalfWidth(LOWER_HALF), LOWER_HALF)
      assert.strictEqual(cs.toHalfWidth(NUMBER_HALF), NUMBER_HALF)
    })

    it('Full-width', function () {
      assert.strictEqual(cs.toHalfWidth(UPPER_FULL), UPPER_HALF)
      assert.strictEqual(cs.toHalfWidth(LOWER_FULL), LOWER_HALF)
      assert.strictEqual(cs.toHalfWidth(NUMBER_FULL), NUMBER_HALF)
    })

    it('Other', function () {
      assert.strictEqual(cs.toHalfWidth(''), '')
      assert.strictEqual(cs.toHalfWidth('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })
})