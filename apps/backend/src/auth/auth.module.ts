import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { AuthMiddleware } from './auth.middleware';
import { BcryptProvider } from './bcrypt.provider';
import { DbModule } from 'src/db/db.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserPrisma } from './user.prisma';

@Module({
  imports: [DbModule],
  controllers: [AuthController, UserController],
  providers: [UserPrisma, BcryptProvider, AuthMiddleware],
  exports: [AuthMiddleware, UserPrisma],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
