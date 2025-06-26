export class AuthLoginException extends Error {
  constructor(message: string = 'Login failed') {
    super(message);
    this.name = 'AuthLoginException';
  }
}
