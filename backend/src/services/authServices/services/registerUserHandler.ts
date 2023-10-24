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
        !validateTokenRes.Succeeded ||
        !validateTokenRes.Result ||
        !validateTokenRes.Result.isvalid
      ) {
        return AppResult.createFailed(new Error('Invalid request.'), 'Invalid request.');
      }
      const { areaOfficeId, id: tokenId } = validateTokenRes.Result;

      const createUserRes = await this.userService.createUserAsync({
        areaOfficeId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
        roles: [],
        username: args.username,
      });
      if (!createUserRes.Succeeded || !createUserRes.Result) {
        return AppResult.createFailed(
          new Error(createUserRes.Message),
          createUserRes.Message,
          createUserRes.Error.code,
        );
      }
      const createdUser = createUserRes.Result;

      const now = new Date();
      const updateTokenRes = await this.inviteTokenService.updateInviteTokenAsync({
        id: tokenId,
        dateUsed: now,
        isUsed: true,
        usedBy: createdUser.id,
      });
      if (!updateTokenRes.Succeeded || !updateTokenRes.Result) {
        return AppResult.createFailed(
          new Error(updateTokenRes.Message),
          updateTokenRes.Message,
          updateTokenRes.Error.code,
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
