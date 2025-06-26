import { CreateApplicationException } from '../exceptions/create-application-exception';
import { CreateApplicationDto } from '../dtos/create-application-dto';

export class CreateApplication {
  constructor(
    private readonly dto: CreateApplicationDto,
    private readonly token: string,
  ) {}

  async execute(): Promise<string> {
    const payload: CreateApplicationDto = {
      email: this.dto.email.trim(),
      first_name: this.dto.first_name.trim(),
      last_name: this.dto.last_name.trim(),
    };
    const response = await fetch(`${process.env.API_URL}api/v1.1/job-application-request/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status >= 500) {
      throw new CreateApplicationException('Server error, please try again later.');
    }
    if (response.status >= 400) {
      const text = await response.text();
      throw new CreateApplicationException(`Application creation failed: ${text}`);
    }

    const data = await response.json();
    return data.confirmation_url || '';
  }
}
