import assert from 'assert'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { ContentService } from '../../src/@service'
import { Config } from '../../src/config'

describe('ContentService', () => {
  container.register(Config, {
    useValue: {
      getPrefix (): string {
        return '/ugd'
      }
    } as Config
  })
  const cs = container.resolve(ContentService)

  describe('#removeCommandPrefix()', () => {
    it('Remove prefix', () => {
      assert.strictEqual(cs.removeCommandPrefix('/ugd 1d100'), '1d100')
      assert.strictEqual(cs.removeCommandPrefix('/ugd 2d6 + 6'), '2d6 + 6')
      assert.strictEqual(cs.removeCommandPrefix('/sphinx 1d100'), '/sphinx 1d100')
    })

    it('Another prefix', () => {
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

    it('Other', () => {
      assert.strictEqual(cs.removeCommandPrefix(''), '')
      assert.strictEqual(cs.removeCommandPrefix('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#addWhitespaceToBothEnds()', () => {
    it('Addition symbol', () => {
      const expected = '/ugd 2d6 + 6'
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6 +6'), expected)
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6+ 6'), expected)
    })

    it('Subtraction symbol', () => {
      const expected = '/ugd 2d6 - 6'
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6 -6'), expected)
      assert.strictEqual(cs.addWhitespaceToBothEnds('/ugd 2d6- 6'), expected)
    })

    it('Other', () => {
      assert.strictEqual(cs.addWhitespaceToBothEnds(''), '')
      assert.strictEqual(cs.addWhitespaceToBothEnds('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#removeDuplicateWhitespace()', () => {
    it('Extra space: Simple dice roll', () => {
      const expected = '/ugd 1d100'
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd 1d100'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('  /ugd 1d100'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd  1d100'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd 1d100  '), expected)
    })

    it('Extra space: Complex dice roll', () => {
      const expected = '/ugd 2d6 + 6'
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd 2d6 + 6'), expected)
      assert.strictEqual(cs.removeDuplicateWhitespace('/ugd  2d6  +   6'), expected)
    })

    it('Other', () => {
      assert.strictEqual(cs.removeDuplicateWhitespace(''), '')
      assert.strictEqual(cs.removeDuplicateWhitespace('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#toHalfWidth()', () => {
    const UPPER_FULL = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
    const LOWER_FULL = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
    const NUMBER_FULL = '０１２３４５６７８９'

    const UPPER_HALF = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LOWER_HALF = 'abcdefghijklmnopqrstuvwxyz'
    const NUMBER_HALF = '0123456789'

    it('Already half-width', () => {
      assert.strictEqual(cs.toHalfWidth(UPPER_HALF), UPPER_HALF)
      assert.strictEqual(cs.toHalfWidth(LOWER_HALF), LOWER_HALF)
      assert.strictEqual(cs.toHalfWidth(NUMBER_HALF), NUMBER_HALF)
      assert.strictEqual(cs.toHalfWidth(' '), ' ')
    })

    it('Full-width', () => {
      assert.strictEqual(cs.toHalfWidth(UPPER_FULL), UPPER_HALF)
      assert.strictEqual(cs.toHalfWidth(LOWER_FULL), LOWER_HALF)
      assert.strictEqual(cs.toHalfWidth(NUMBER_FULL), NUMBER_HALF)
      assert.strictEqual(cs.toHalfWidth('　'), ' ')
    })

    it('Other', () => {
      assert.strictEqual(cs.toHalfWidth(''), '')
      assert.strictEqual(cs.toHalfWidth('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })

  describe('#removeSubsequentLines()', () => {
    it('With line breaks', () => {
      assert.strictEqual(cs.removeSubsequentLines('/ugd 2d6 + 6\n/ugd 1d3'), '/ugd 2d6 + 6')
      assert.strictEqual(cs.removeSubsequentLines('/ugd 2d6 + 6\r\n/ugd 1d3'), '/ugd 2d6 + 6')
    })

    it('No line breaks', () => {
      assert.strictEqual(cs.removeSubsequentLines('/ugd 2d6 + 6'), '/ugd 2d6 + 6')
    })

    it('Other', () => {
      assert.strictEqual(cs.removeSubsequentLines(''), '')
      assert.strictEqual(cs.removeSubsequentLines('ダイスの駄女神'), 'ダイスの駄女神')
    })
  })
})
