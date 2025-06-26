import { AuthLoginException } from '../exceptions/auth-login-exception';
import { LogInDto } from '../dtos/log-in-dto';

export class LogIn {
  constructor(private readonly dto: LogInDto) {}

  async execute(): Promise<string> {
    const payload: LogInDto = {
      email: this.dto.email.trim(),
      password: this.dto.password,
    };
    const response = await fetch(`${process.env.API_URL}api/v1.1/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status >= 500) {
      throw new AuthLoginException('Server error, please try again later.');
    }
    if (!response.ok) {
      throw new AuthLoginException('Login failed');
    }

    const data = await response.json();
    return data.token ?? '';
  }
}
