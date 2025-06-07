export class RequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequestError';
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}