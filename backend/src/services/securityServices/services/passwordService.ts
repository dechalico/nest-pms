import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppErrorCodes, AppResult } from '../../../common/app.result';

@Injectable()
export class PasswordHasher {
  private readonly saltOrRounds: number | string = 10;

  async hashPassword(password: string): Promise<AppResult<string>> {
    try {
      const hash = await bcrypt.hash(password, this.saltOrRounds);
      return AppResult.createSucceeded(hash, 'Password successfully hashed.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured whent trying to hash password.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<AppResult<boolean>> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return AppResult.createSucceeded(
        isMatch,
        'Password successfully validated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to validate password.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
