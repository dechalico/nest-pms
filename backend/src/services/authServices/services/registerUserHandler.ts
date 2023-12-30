import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { IRegisterUserHandler } from '../handlers/iRegisterUserHandler';
import { RegisterUserArgs, RegisterUserResult } from '../interactors/registerUserInteractor';
import { Injectable } from '@nestjs/common';
import { IValidateUserInviteHandler } from '../handlers/IValidateUserInviteHandler';
import { UserService } from '../../baseServices/services/user.service';
import { InviteTokenService } from '../../baseServices/services/inviteToken.service';

@Injectable()
export class RegisterUserHandler implements IRegisterUserHandler {
  constructor(
    private readonly validateToken: IValidateUserInviteHandler,
    private readonly userService: UserService,
    private readonly inviteTokenService: InviteTokenService,
  ) {}

  async executeAsync(args: RegisterUserArgs): Promise<AppResult<RegisterUserResult>> {
    try {
      const validateTokenRes = await this.validateToken.executeAsync({
        guid: args.guid,
        token: args.token,
      });
      if (
        !validateTokenRes.succeeded ||
        !validateTokenRes.result ||
        !validateTokenRes.result.isvalid
      ) {
        return AppResult.createFailed(
          new Error('Invalid request. Token already expired.'),
          'Invalid request. Token already expired.',
        );
      }
      const { areaOfficeId, id: tokenId } = validateTokenRes.result;

      const createUserRes = await this.userService.createUserAsync({
        areaOfficeId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
        roles: [],
        username: args.username,
      });
      if (!createUserRes.succeeded || !createUserRes.result) {
        return AppResult.createFailed(
          new Error(createUserRes.message),
          createUserRes.message,
          createUserRes.error.code,
        );
      }
      const createdUser = createUserRes.result;

      const now = new Date();
      const updateTokenRes = await this.inviteTokenService.updateInviteTokenAsync({
        id: tokenId,
        dateUsed: now,
        isUsed: true,
        usedBy: createdUser.id,
      });
      if (!updateTokenRes.succeeded || !updateTokenRes.result) {
        return AppResult.createFailed(
          new Error(updateTokenRes.message),
          updateTokenRes.message,
          updateTokenRes.error.code,
        );
      }

      return AppResult.createSucceeded(
        {
          email: createdUser.email,
          firstName: createdUser.firstName,
          id: createdUser.id,
          lastName: createdUser.lastName,
          username: createdUser.username,
        },
        'User successfully registered.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured in RegisterUserHandler',
        AppErrorCodes.InternalError,
      );
    }
  }
}
