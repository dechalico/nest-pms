import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppResult } from '../../../common/app.result';

@Injectable()
export class PasswordHasher {
  private readonly saltOrRounds: number | string = 10;

  async hashPassword(password: string): Promise<AppResult<string>> {
    try {
      const hash = await bcrypt.hash(password, this.saltOrRounds);
      return AppResult.createSucceeded(hash, 'successfully hashed password.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured whent trying to hash password',
      );
    }
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<AppResult<boolean>> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return AppResult.createSucceeded(true, 'successfully validate password');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when trying to validate password',
      );
    }
  }
}
