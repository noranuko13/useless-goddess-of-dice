export class Calc {
  static sumOfNumbers (numbers: number[]): number {
    if (numbers.length === 0) {
      return 0
    }

    return numbers.reduce((acc: number, num: number) => acc + num, 0)
  }
}
