import assert from 'assert'
import { Message, MessageOptions } from 'discord.js'
import 'reflect-metadata'
import { TLogLevelName } from 'tslog'
import { container } from 'tsyringe'
import { Config } from '../src/config'
import { Kernel } from '../src/kernel'

container.register(Config, {
  useValue: {
    getPrefix (): string { return '/ugd' },
    getLogLevel (): TLogLevelName { return 'fatal' },
    isDebug (): boolean { return false }
  } as Config
})
const kernel = container.resolve(Kernel)
const fn = (content: string): string => {
  let str = ''
  const message = {
    author: { bot: false },
    member: { displayHexColor: 'DEFAULT' },
    content,
    channel: {
      send: (message: MessageOptions): Promise<Message> => {
        str = message.embed?.description ?? 'NONE'
        return new Promise<Message>(() => {})
      }
    }
  } as Message
  (kernel as any).listener(message)
  return str
}
const assertTests = (tests: { content: string, pattern: string }[]) => {
  tests.forEach(({ content, pattern }) => {
    const output = fn(content)
    it(`input: ${content}, output: ${output.replace(/\n/g, '')}`, function () {
      const re = new RegExp(pattern)
      assert.strictEqual(re.test(output), true)
    })
  })
}

const PATTERN_BAD_COMMAND_ERROR = 'Bad command error!'
const PATTERN_NOT_FOUND_ERROR = 'Not found error!'

describe('End To End Testing(E2E)', function () {
  describe('Base', function () {
    const tests = [
      { content: 'no prefix', pattern: '' },
      { content: '/ugd', pattern: PATTERN_NOT_FOUND_ERROR },
      { content: '/ugd none', pattern: PATTERN_BAD_COMMAND_ERROR },

      // Calculation
      { content: '/ugd 1 + 2 + 3', pattern: ':black_circle: 1 \\+ 2 \\+ 3 = 6' },
      { content: '/ugd 10 - 6', pattern: ':black_circle: 10 - 6 = 4' }
    ]

    // eslint-disable-next-line mocha/no-setup-in-describe
    assertTests(tests)
  })

  describe('NSidedDice', function () {
    const tests = [
      { content: '/ugd BadCommand', pattern: PATTERN_BAD_COMMAND_ERROR },
      { content: '/ugd 1d100', pattern: ':black_circle: 1d100<\\d+> = \\d+' },
      { content: '/ugd 2d6 + 1d3', pattern: ':black_circle: 2d6<[1-6],[1-6]> \\+ 1d3<[1-3]> = \\d+' },
      { content: '/ugd 2d6 + 1d3 + 1d2', pattern: ':black_circle: 2d6<[1-6],[1-6]> \\+ 1d3<[1-3]> \\+ 1d2<[1-2]> = \\d+' },
      { content: '/ugd 2d6 - 1d3', pattern: ':black_circle: 2d6<[1-6],[1-6]> - 1d3<[1-3]> = -?\\d+' },
      { content: '/ugd 2d6 - 1d3 - 1d2', pattern: ':black_circle: 2d6<[1-6],[1-6]> - 1d3<[1-3]> - 1d2<[1-2]> = -?\\d+' },
      { content: '/ugd 2d6 + 6', pattern: ':black_circle: 2d6<[1-6],[1-6]> \\+ 6 = \\d+' },
      { content: '/ugd 1d6 - 3', pattern: ':black_circle: 1d6<[1-6]> - 3 = -?\\d+' },
      { content: '/ugd 1d6 / 2', pattern: ':black_circle: 1d6<[1-6]> / 2 = [\\d.]+' },
      { content: '/ugd 1d6 * 2', pattern: ':black_circle: 1d6<[1-6]> \\* 2 = [\\d.]+' }
    ]

    // eslint-disable-next-line mocha/no-setup-in-describe
    assertTests(tests)
  })

  describe('Choice', function () {
    const tests = [
      { content: '/ugd choice', pattern: PATTERN_NOT_FOUND_ERROR },
      { content: '/ugd choice Gyoza Curry', pattern: ':black_circle: (Gyoza|Curry)' },
      { content: '/ugd choice Pancake Tiramisu Pancake Churros', pattern: ':black_circle: (Pancake|Tiramisu|Churros)' }
    ]

    // eslint-disable-next-line mocha/no-setup-in-describe
    assertTests(tests)
  })

  describe('Skill', function () {
    const tests = [
      { content: '/ugd skill', pattern: PATTERN_NOT_FOUND_ERROR },
      {
        content: '/ugd skill 1d100 * 1 SpotHidden(80/2) Listen(40+2d6)',
        pattern: ':black_circle: 1d100<\\d+> \\* 1 = \\d+\n' +
          ' 　 SpotHidden :black_circle: \\( 80 / 2 \\) = \\d+ 　 :[a-z0-9_]*: .*!\n' +
          ' 　 Listen :black_circle: \\( 40 \\+ 2d6<[1-6],[1-6]> \\) = \\d+ 　 :[a-z0-9_]*: .*!\n'
      }
    ]

    // eslint-disable-next-line mocha/no-setup-in-describe
    assertTests(tests)
  })
})
