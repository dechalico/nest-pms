import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { AppErrorCodes, AppResult } from 'src/common/app.result';

@Injectable()
export class TokenService {
  async generateTokenAsync(
    urlSafe: boolean,
  ): Promise<AppResult<GeneratedToken>> {
    try {
      const randombytesAsync = promisify(randomBytes);
      const format = urlSafe ? 'base64url' : 'base64';
      const token = (await randombytesAsync(50)).toString(format);
      const uuid = uuidv4();
      return AppResult.createSucceeded(
        { token, uuid },
        'Successfully generate token',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when generating token.',
        AppErrorCodes.InternalError,
      );
    }
  }
}

export interface GeneratedToken {
  token: string;
  uuid: string;
}
