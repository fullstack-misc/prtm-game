export class CreateApplicationException extends Error {
  constructor(message: string = 'Failed to create application') {
    super(message);
    this.name = 'CreateApplicationException';
  }
}
