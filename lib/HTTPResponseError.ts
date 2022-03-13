/**
 * Class for dealing with generic HTTP response errors.
 */
export default class HTTPResponseError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string = 'HTTP error') {
    super(`${statusCode}: ${message}`);
    this.statusCode = statusCode;
  }
}
