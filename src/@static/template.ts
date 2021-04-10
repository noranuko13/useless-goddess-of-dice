type CommonType = typeof import('../../template/default.json')
type TemplateType = typeof import('../../template/default.json')

export class Template {
  static get common (): CommonType {
    return require('../../template/default.json')
  }

  static get messages (): TemplateType {
    return require('../../template/default.json')
  }
}
