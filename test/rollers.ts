import 'reflect-metadata'
import { NSidedDice } from '../src/dices'
import assert from 'assert'
import { DiceCommand } from '../src/parser'
import { container } from 'tsyringe'
import { DiceResult, DiceRoller } from '../src/rollers'

describe('DiceResult', function () {
  const diceResult = new DiceResult({
    addDices: [
      { side: 10, deme: 4, getDeme () { return 4 } } as unknown as NSidedDice,
      { side: 6, deme: 5, getDeme () { return 5 } } as unknown as NSidedDice
    ],
    subDices: [
      { side: 3, deme: 2, getDeme () { return 2 } } as unknown as NSidedDice,
      { side: 4, deme: 1, getDeme () { return 1 } } as unknown as NSidedDice
    ]
  }) as any

  const emptyResult = new DiceResult({
    addDices: [],
    subDices: []
  }) as any

  describe('#toString()', function () {
    it('Number of dice is the total number of times', function () {
      assert.strictEqual(diceResult.toString(), '+ ( 4 + 5 ) - ( 2 + 1 ) = 6')
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.toString(), '')
    })
  })

  describe('#toStringDices()', function () {
    it('Normal', function () {
      assert.deepStrictEqual(
        diceResult.toStringDices('+', diceResult.addDices),
        ['+', '(', '4 + 5', ')']
      )
      assert.deepStrictEqual(
        diceResult.toStringDices('-', diceResult.subDices),
        ['-', '(', '2 + 1', ')']
      )
    })

    it('Empty Dices', function () {
      assert.deepStrictEqual(emptyResult.toStringDices('+', []), [])
    })
  })

  describe('#getTotal()', function () {
    it('Normal', function () {
      assert.strictEqual(diceResult.getTotal(), 6)
    })

    it('Empty Dices', function () {
      assert.strictEqual((emptyResult as any).getTotal(), 0)
    })
  })

  describe('#getDiceTotal()', function () {
    it('Normal', function () {
      assert.strictEqual(diceResult.getDiceTotal(diceResult.addDices), 9)
    })

    it('Empty Dices', function () {
      assert.strictEqual(emptyResult.getDiceTotal([]), 0)
    })
  })
})

describe('DiceRoller', function () {
  describe('#rollNSidedDice()', function () {
    const diceRoller = container.resolve(DiceRoller) as any
    let dices: NSidedDice[] = []
    const diceCommands: DiceCommand[] = []

    it('Number of dice is the total number of times', function () {
      diceCommands.push({ time: 2, side: 4 })
      diceCommands.push({ time: 1, side: 5 })
      dices = diceRoller.rollNSidedDice(diceCommands)
      assert.strictEqual(dices.length, 3)

      diceCommands.push({ time: 4, side: 4 })
      dices = diceRoller.rollNSidedDice(diceCommands)
      assert.strictEqual(dices.length, 7)
    })

    it('Empty DiceCommands', function () {
      dices = diceRoller.rollNSidedDice([])
      assert.strictEqual(dices.length, 0)
    })
  })
})