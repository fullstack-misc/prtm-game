export class RegisterException extends Error {
  constructor(message: string = 'Registration failed') {
    super(message);
    this.name = 'RegisterException';
  }
}
