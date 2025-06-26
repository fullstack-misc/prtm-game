export class GetCreatedApplicationException extends Error {
  constructor(message: string = 'Failed to retrieve created application') {
    super(message);
    this.name = 'GetCreatedApplicationException';
  }
}
