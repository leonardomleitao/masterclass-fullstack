import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserPrisma } from './user.prisma';
import { UserProps } from '@taskmaster/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly repo: UserPrisma) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        throw new HttpException('Token não informado', 401);
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserProps;

      if (!payload || !payload.email) {
        throw new HttpException('Token inválido', 401);
      }

      const user = await this.repo.findByEmail(payload.email!);

      if (!user) {
        throw new HttpException('Usuário não encontrado', 401);
      }

      (req as any).user = user.withoutPassword();
      next();
    } catch {
      throw new HttpException('Token inválido', 401);
    }
  }
}
