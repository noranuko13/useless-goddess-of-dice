type TemplateType = typeof import('../../template/messages/default.json')

export class Template {
  static get messages (): TemplateType {
    return require('../../template/messages/default.json')
  }
}
