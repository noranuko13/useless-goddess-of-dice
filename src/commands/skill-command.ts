import { Template } from '../@static'
import { Command } from './command.interface'
import { NSidedDiceCommand } from './n-sided-dice-command'
import { SkillDiceCommand } from './skill-dice-command'

export class SkillCommand implements Command {
  private readonly nSidedDice: NSidedDiceCommand;
  private readonly skillDices: SkillDiceCommand[] = [];

  constructor (inputs: string[]) {
    const nameArgs: string[] = []
    for (let i = 0; i <= inputs.length; i++) {
      if (/^\d+d\d+$|^\d+$|^[+\-*/]$/.test(inputs[i])) {
        nameArgs.push(inputs[i])
        continue
      }
      inputs = inputs.slice(i)
      break
    }
    this.nSidedDice = new NSidedDiceCommand(nameArgs)

    let skillArgs = []
    for (let i = 0; i < inputs.length; i++) {
      skillArgs.push(inputs[i])
      if (inputs[i] === ')') {
        this.skillDices.push(new SkillDiceCommand(skillArgs))
        skillArgs = []
      }
    }
  }

  cast (): void {
    this.nSidedDice.cast()
    this.skillDices.map(arg => arg.nSidedDice.cast())
  }

  toString (): string {
    const outputs = []

    outputs.push(this.nSidedDice.toString() + '\n')

    this.skillDices.map((skill) => {
      outputs.push('　')
      outputs.push(skill.toString())
      outputs.push('　')
      outputs.push(this.getLevel(skill.nSidedDice.toNumber()) + '\n')
      return true
    })

    return outputs.join(' ')
  }

  private getLevel (point: number): string {
    const deme: number = this.nSidedDice.toNumber()
    const oneFifth = Math.floor(point / 5)

    if (deme <= 5) return Template.common.levels.critical
    if (deme <= oneFifth) return Template.common.levels.special
    if (deme <= point) return Template.common.levels.success

    if (deme >= 96) return Template.common.levels.fumble
    return Template.common.levels.failure
  }
}
