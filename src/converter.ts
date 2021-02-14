export class MessageConverter {
  removeWhiteSpace (text: string) {
    text = text.replace(/ +/g, ' ')
    return text.trim()
  }

  toHalfWidth (text: string) {
    return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (text) {
      return String.fromCharCode(text.charCodeAt(0) - 0xFEE0)
    })
  }
}
