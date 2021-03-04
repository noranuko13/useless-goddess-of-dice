import { NSidedDiceService } from './services'

export module Constant {
  export const DiceType = {
    NSidedDice: NSidedDiceService
  } as const

  export type Values<T> = T[keyof T];
}
