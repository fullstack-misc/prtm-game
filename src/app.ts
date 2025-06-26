import dotenv from 'dotenv';
dotenv.config();

import { RegisterDto } from './core/auth/dtos/register-dto';
import { Register } from './core/auth/use-cases/register';
import { LogIn } from './core/auth/use-cases/log-in';
import { LogInDto } from './core/auth/dtos/log-in-dto';
import { CreateApplicationDto } from './core/application/dtos/create-application-dto';
import { CreateApplication } from './core/application/use-cases/create-application';
import { GetCreatedApplication } from './core/application/use-cases/get-created-application';
import { ConfirmApplication } from './core/application/use-cases/confirm-application';

export class App {
  private static token = '';
  private static confirmationUrl = '';

  public static async Main(): Promise<void> {
    console.log('🚀 Starting application...');
    this.authenticateAndApply();
  }

  private static async authenticateAndApply(): Promise<void> {
    try {
      await this.register();
      await this.logInAndSetToken();
      await this.createApplication();
      await this.getCreatedApplicationUrlAndConfirmApplication();
    } catch (error) {
      console.error('❌ An error occurred during the process:', error);
    }
  }

  private static async register(): Promise<void> {
    console.log('\n1️⃣ Registering user...');

    const credentials: RegisterDto = {
      email: process.env.EMAIL || '',
      password1: process.env.PASSWORD1 || '',
      password2: process.env.PASSWORD2 || '',
    };
    await new Register(credentials).execute();

    console.log('✅ User registered successfully.');
  }

  private static async logInAndSetToken(): Promise<void> {
    console.log('\n2️⃣ Logging in user...');

    const credentials: LogInDto = {
      email: process.env.EMAIL || '',
      password: process.env.PASSWORD1 || '',
    };
    this.token = await new LogIn(credentials).execute();

    console.log('✅ User logged in successfully.');
  }

  private static async createApplication(): Promise<void> {
    console.log('\n3️⃣ Creating application...');

    const dto: CreateApplicationDto = {
      email: process.env.EMAIL || '',
      first_name: '',
      last_name: '',
    };

    await new CreateApplication(dto, this.token).execute();
    console.log('✅ Application created successfully.');
  }

  private static async getCreatedApplicationUrlAndConfirmApplication(): Promise<void> {
    console.log('[...] Getting created application...');

    const maxAttempts = 3;
    let attemptCount = 0;
    while (attemptCount < maxAttempts) {
      console.log(`[...] Checking for application confirmation URL (${++attemptCount})...`);

      const data = await new GetCreatedApplication(this.token).execute();
      if (data?.results[0]?.status === 'COMPLETED') {
        this.confirmationUrl = data.results[0]?.confirmation_url || '';

        await this.confirmApplication();
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 3_000));
    }
  }

  private static async confirmApplication(): Promise<void> {
    console.log('\n4️⃣ Confirming application...');

    await new ConfirmApplication(this.confirmationUrl, this.token).execute();

    console.log('✅ Application confirmed successfully.');
  }
}
