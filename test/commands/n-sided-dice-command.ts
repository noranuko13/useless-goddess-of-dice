import assert from 'assert'
import 'reflect-metadata'
import { NSidedDiceCommand } from '../../src/commands'

describe('NSidedDiceCommand', () => {
  describe('Create instance.', () => {
    it('String array value.', () => {
      assert.deepStrictEqual(
        JSON.stringify(new NSidedDiceCommand(['2d6', '-', '1d3', '+', '10', '-', '7'])),
        JSON.stringify({
          inputs: ['2d6', '-', '1d3', '+', '10', '-', '7']
        })
      )
    })
  })
})
