import { Result } from './result.interface'

export class NSidedDiceResult implements Result {
  constructor (private outputs: string[], private total: number) {}

  toString = () : string => {
    this.outputs.unshift(':black_circle:')

    this.outputs.push('=')
    this.outputs.push(this.total.toString())

    return this.outputs.join(' ')
  }
}
