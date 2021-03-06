import { NSidedDice } from '../dices/n-sided-dice'

export {}

declare global {
  interface Array<T> {
    typeofNumber(this: Array<number>): boolean;
    instanceofNSidedDice(this: Array<NSidedDice>): boolean;

    total(this: Array<never>): number;
    total(this: Array<number>): number;
    total(this: Array<NSidedDice>): number;
    total(this: Array<T>): number;
  }
}

if (!Array.prototype.typeofNumber) {
  Array.prototype.typeofNumber = function (this: Array<any>): boolean {
    return this.every(item => typeof item === 'number')
  }
}

if (!Array.prototype.instanceofNSidedDice) {
  Array.prototype.instanceofNSidedDice = function (this: Array<any>): boolean {
    return this.every(item => typeof item === 'object' && item instanceof NSidedDice)
  }
}

if (!Array.prototype.total) {
  Array.prototype.total = function (this: Array<any>): number {
    if (this.length === 0) {
      return 0
    }

    if (this.typeofNumber()) {
      return this.reduce((acc: number, num: number) => acc + num, 0)
    }

    if (this.instanceofNSidedDice()) {
      return this.reduce((acc: number, dice: NSidedDice) => acc + dice.getDeme(), 0)
    }

    throw new TypeError()
  }
}
