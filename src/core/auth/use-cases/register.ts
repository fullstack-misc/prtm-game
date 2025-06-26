import { RegisterException } from '../exceptions/register-exception';
import { LogInErrorResponse } from '../interfaces/log-in-error-response.interface';
import { RegisterDto } from '../dtos/register-dto';

export class Register {
  constructor(private readonly dto: RegisterDto) {}

  async execute(): Promise<void> {
    const payload: RegisterDto = {
      email: this.dto.email.trim(),
      password1: this.dto.password1,
      password2: this.dto.password2,
    };
    const response = await fetch(`${process.env.API_URL}api/v1.1/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status >= 500) {
      throw new RegisterException('Server error, please try again later.');
    }
    if (response.status === 400) {
      const text = (await JSON.parse(await response.text())) as LogInErrorResponse;
      const errorMessage = text.message || text.errors;

      throw new RegisterException(errorMessage);
    }
  }
}
