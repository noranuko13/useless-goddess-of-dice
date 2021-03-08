export abstract class ReplyError extends Error {
  abstract code: string

  protected constructor (message?: string) {
    super(message)
  }
}
