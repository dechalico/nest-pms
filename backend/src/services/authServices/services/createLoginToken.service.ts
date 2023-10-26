import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { ICreateLoginTokenHandler } from '../handlers/iCreateLoginTokenHandler';
import {
  CreateLoginTokenArgs,
  CreateLoginTokenResult,
} from '../interactors/createLoginTokenInteractor';
import { PasswordHasher } from '../../securityServices/services/passwordService';
import { UserService } from '../../baseServices/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateLoginToken implements ICreateLoginTokenHandler {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async executeAsync(args: CreateLoginTokenArgs): Promise<AppResult<CreateLoginTokenResult>> {
    try {
      // check user if existed
      const chkUserRes = await this.userService.getUserByUsernameAsync(args.username);
      if (!chkUserRes.succeeded && chkUserRes.error.code === AppErrorCodes.NotFound) {
        return AppResult.createFailed(
          new Error('Invalid username or password.'),
          'Invalid username or password.',
          AppErrorCodes.InvalidRequest,
        );
      }
      if (!chkUserRes.succeeded || !chkUserRes.result) {
        return AppResult.createFailed(
          new Error(chkUserRes.message),
          chkUserRes.message,
          chkUserRes.error.code,
        );
      }
      const user = chkUserRes.result;

      // validate user password
      const chkPassword = await this.passwordHasher.validatePassword(args.password, user.password);
      if (!chkPassword.succeeded || !chkPassword.result) {
        return AppResult.createFailed(
          new Error('Invalid username or password.'),
          'Invalid username or password.',
          AppErrorCodes.InvalidRequest,
        );
      }

      // create login token
      const jwtPayload = {
        id: user.id,
        username: user.username,
      };
      const token = await this.jwtService.signAsync(jwtPayload);

      return AppResult.createSucceeded(
        { firstName: user.firstName, lastName: user.lastName, token },
        'login token successfully creataed',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured in CreateLoginToken',
        AppErrorCodes.InternalError,
      );
    }
  }
}
