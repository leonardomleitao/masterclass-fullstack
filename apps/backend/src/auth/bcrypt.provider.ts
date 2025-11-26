import { Injectable } from '@nestjs/common';
import { CryptoProvider } from '@taskmaster/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements CryptoProvider {
  async encrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
