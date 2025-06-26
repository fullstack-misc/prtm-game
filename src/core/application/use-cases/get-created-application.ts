import { GetCreatedApplicationException } from '../exceptions/get-created-application-exception';

export class GetCreatedApplication {
  constructor(private readonly token: string) {}

  async execute(): Promise<any> {
    const response = await fetch(`${process.env.API_URL}api/v1.1/job-application-request/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
    });

    if (response.status >= 500) {
      throw new GetCreatedApplicationException('Server error, please try again later.');
    }
    if (!response.ok) {
      throw new GetCreatedApplicationException(`Failed to retrieve application.`);
    }

    return await response.json();
  }
}
