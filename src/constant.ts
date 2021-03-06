import { BadCommandError, NotFoundError } from './@error'
import { NSidedDiceService } from './services'

export module Constant {
  export const DiceType = {
    NSidedDice: NSidedDiceService
  } as const

  export type Values<T> = T[keyof T];

  export function diceTypeOf (content: string): Values<typeof DiceType> {
    const args = content.split(/ +/).filter(Boolean)

    if (args.length === 0) {
      throw new NotFoundError()
    }

    if (/^\d+d\d+$|^\d+$|^\+$|^-$/.test(args[0])) {
      return DiceType.NSidedDice
    }

    throw new BadCommandError()
  }
}
