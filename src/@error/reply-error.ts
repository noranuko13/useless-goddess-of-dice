export abstract class ReplyError extends Error {
  protected constructor (message?: string) {
    super(message)
  }
}
