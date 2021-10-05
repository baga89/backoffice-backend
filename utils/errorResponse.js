// https://dev.to/nedsoft/central-error-handling-in-express-3aej

// Construct custom error object with message and statusCode
export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
