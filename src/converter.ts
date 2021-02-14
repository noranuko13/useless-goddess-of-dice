export class MessageConverter {
  static removeWhiteSpace (text: string) {
    text = text.replace(/ +/g, ' ')
    return text.trim()
  }

  static toHalfWidth (text: string) {
    return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
  }
}
