type CommonType = typeof import('../../template/common.json')
type TemplateType = typeof import('../../template/messages/default.json')

export class Template {
  static get common (): CommonType {
    return require('../../template/common.json')
  }

  static get messages (): TemplateType {
    return require('../../template/messages/default.json')
  }
}
