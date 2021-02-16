export class NSidedDice {
  private readonly side: number;
  private readonly deme: number;

  constructor (side: number) {
    this.side = side
    this.deme = this.korokoro()
  }

  private korokoro (): number {
    return Math.floor(Math.random() * this.side) + 1
  }
}
