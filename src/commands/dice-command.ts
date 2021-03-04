export class DiceCommand {
  private readonly ndm: string;
  private readonly time: number;
  private readonly side: number;

  constructor (ndm: string) {
    const numbers = ndm.match(/^(\d+)d(\d+)$/) || []
    this.ndm = numbers[0]
    this.time = parseInt(numbers[1])
    this.side = parseInt(numbers[2])
  }

  getNdm (): string {
    return this.ndm
  }

  getTime (): number {
    return this.time
  }

  getSide (): number {
    return this.side
  }
}
