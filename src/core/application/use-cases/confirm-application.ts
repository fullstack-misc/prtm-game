import { ConfirmApplicationException } from '../exceptions/confirm-application-exception';
import { ConfirmApplicationUpdate } from '../interfaces/confirm-application-update.interface';

export class ConfirmApplication {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  async execute(): Promise<void> {
    const payload: ConfirmApplicationUpdate = {
      confirmed: true,
    };
    const response = await fetch(this.url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status >= 500) {
      throw new ConfirmApplicationException('Server error, please try again later.');
    }
    if (!response.ok) {
      throw new ConfirmApplicationException('Failed to confirm application.');
    }
  }
}
