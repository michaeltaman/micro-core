export class AuthorizationError extends Error {
  constructor(message = 'AuthorizationError') {
    super(message);
  }
}
