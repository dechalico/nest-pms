import { AppErrorCodes, AppResult } from 'src/common/app.result';
import { ICreateLoginTokenHandler } from '../handlers/iCreateLoginTokenHandler';
import {
  CreateLoginTokenArgs,
  CreateLoginTokenResult,
} from '../interactors/createLoginTokenInteractor';
import { PasswordHasher } from '../../securityServices/services/passwordService';
import { UserService } from '../../baseServices/services/user.service';
import { JwtService } from '@nestjs/jwt';

export class CreateLoginToken implements ICreateLoginTokenHandler {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async executeAsync(
    args: CreateLoginTokenArgs,
  ): Promise<AppResult<CreateLoginTokenResult>> {
    try {
      // check user if existed
      const chkUserRes = await this.userService.getUserByUsernameAsync(
        args.username,
      );
      if (
        !chkUserRes.Succeeded &&
        chkUserRes.Error.code === AppErrorCodes.NotFound
      ) {
        return AppResult.createFailed(
          new Error('invalid username or password'),
          'invalid username or password',
        );
      }
      if (!chkUserRes.Succeeded || !chkUserRes.Result) {
        return AppResult.createFailed(
          new Error(chkUserRes.Message),
          chkUserRes.Message,
        );
      }
      const user = chkUserRes.Result;

      // validate user password
      const chkPassword = await this.passwordHasher.validatePassword(
        args.password,
        user.password,
      );
      if (!chkPassword.Succeeded || !chkPassword.Result) {
        return AppResult.createFailed(
          new Error('invalid username or password'),
          'invalid username or password',
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
      );
    }
  }
}
