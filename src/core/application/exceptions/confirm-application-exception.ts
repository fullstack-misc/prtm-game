export class ConfirmApplicationException extends Error {
  constructor(message: string = 'Failed to confirm application') {
    super(message);
    this.name = 'ConfirmApplicationException';
  }
}
