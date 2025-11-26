import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChangeUserName, User, UserByEmail } from '@taskmaster/core';
import { UserPrisma } from './user.prisma';
import { LoggedUser } from 'src/shared/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly repo: UserPrisma) {}

  @Get()
  async getUser(@LoggedUser() loggedUser: User) {
    const useCase = new UserByEmail(this.repo);
    const user = await useCase.execute(loggedUser.email);
    return user.data;
  }

  @Post('change-name')
  async changeName(
    @Body() data: { name: string },
    @LoggedUser() loggedUser: User,
  ) {
    const useCase = new ChangeUserName(this.repo);
    await useCase.execute(data.name, loggedUser);
  }
}
