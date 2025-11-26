import { BcryptProvider } from './bcrypt.provider';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUser, UserLogin } from '@taskmaster/core';
import { UserPrisma } from './user.prisma';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly repo: UserPrisma,
    private readonly cripto: BcryptProvider,
  ) {}

  @Post('register')
  async register(
    @Body() user: { name: string; email: string; password: string },
  ) {
    const useCase = new RegisterUser(this.repo, this.cripto);
    await useCase.execute(user);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const useCase = new UserLogin(this.repo, this.cripto);
    const user = await useCase.execute(data);

    const secret = process.env.JWT_SECRET!;
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      secret,
      { expiresIn: '15d' },
    );
  }
}
