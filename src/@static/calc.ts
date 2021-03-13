import { NSidedDice } from '../dices'

export class Calc {
  static sumOfNumbers (numbers: number[]): number {
    if (numbers.length === 0) {
      return 0
    }

    return numbers.reduce((acc: number, num: number) => acc + num, 0)
  }

  static sumOfNSidedDice (dices: NSidedDice[]): number {
    if (dices.length === 0) {
      return 0
    }

    return dices.reduce((acc: number, dice: NSidedDice) => acc + dice.getDeme(), 0)
  }
}
