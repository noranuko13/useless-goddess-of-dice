import { Dice } from './dise.interface'

export class NSidedDice implements Dice {
  private readonly side: number;
  private readonly deme: number;

  constructor (side: number, deme?: number) {
    this.side = side
    this.deme = deme ?? this.korokoro()
  }

  getDeme (): number {
    return this.deme
  }

  korokoro (): number {
    return Math.floor(Math.random() * this.side) + 1
  }
}
