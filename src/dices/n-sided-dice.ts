import { Dice } from './dise.interface'

export class NSidedDice implements Dice {
  private readonly side: number;

  constructor (side: number) {
    this.side = side
  }

  korokoro (): number {
    return Math.floor(Math.random() * this.side) + 1
  }
}
