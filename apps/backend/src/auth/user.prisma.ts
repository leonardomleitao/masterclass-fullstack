import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { User, UserProps, UserRepository } from '@taskmaster/core';

@Injectable()
export class UserPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id ?? -1 },
      update: user.props,
      create: user.props as any,
    });
  }

  async updateProps(user: User, props: Partial<UserProps>): Promise<void> {
    const userFromDb = await this.prisma.user.findUnique({
      where: { id: user.id ?? -1 },
    });

    if (!userFromDb) {
      throw new Error('User not found');
    }

    await this.prisma.user.update({
      where: { id: user.id ?? -1 },
      data: { ...userFromDb, ...props },
    });
  }

  async findByEmail(
    email: string,
    withPassword: boolean = false,
  ): Promise<User | null> {
    const user: UserProps | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return withPassword ? new User(user) : new User(user).withoutPassword();
    } else {
      return null;
    }
  }
}
