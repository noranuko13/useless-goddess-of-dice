type TemplateType = typeof import('../../template/default.json')

export class Template {
  static get messages (): TemplateType {
    return require('../../template/default.json')
  }
}
