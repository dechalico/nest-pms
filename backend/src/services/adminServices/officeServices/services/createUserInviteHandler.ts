import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { ICreateUserInviteHandler } from '../handlers/iCreateUserInviteHandler';
import {
  CreateUserInviteArgs,
  CreateUserInviteResult,
} from '../interactors/createUserInviteInteractor';
import { Injectable } from '@nestjs/common';
import { TokenService } from '../../../securityServices/services/tokenService';
import { InviteTokenService } from '../../../baseServices/services/inviteToken.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';

@Injectable()
export class CreateUserInviteHandler implements ICreateUserInviteHandler {
  constructor(
    private readonly tokenService: TokenService,
    private readonly inviteTokenService: InviteTokenService,
    private readonly currentUser: ICurrentUserHandler,
  ) {}

  async executeAsync(args: CreateUserInviteArgs): Promise<AppResult<CreateUserInviteResult>> {
    try {
      const currentUserRes = await this.currentUser.executeAsync({});
      if (!currentUserRes.Succeeded || !currentUserRes.Result) {
        return AppResult.createFailed(
          new Error(currentUserRes.Message),
          currentUserRes.Message,
          currentUserRes.Error.code,
        );
      }
      const currentUser = currentUserRes.Result;

      // generate token
      const generateRes = await this.tokenService.generateTokenAsync(true);
      if (!generateRes.Succeeded || !generateRes.Result) {
        return AppResult.createFailed(
          new Error(generateRes.Message),
          generateRes.Message,
          generateRes.Error.code,
        );
      }
      const { token, uuid } = generateRes.Result;
      const createInviteToken = await this.inviteTokenService.createInviteTokenAsync({
        areaOfficeId: args.areaOfficeId,
        createdBy: currentUser.id,
        dateUsed: undefined,
        guid: uuid,
        isUsed: false,
        token,
        usedBy: undefined,
      });
      if (!createInviteToken.Succeeded || !createInviteToken.Result) {
        return AppResult.createFailed(
          new Error(createInviteToken.Message),
          createInviteToken.Message,
          createInviteToken.Error.code,
        );
      }

      return AppResult.createSucceeded(
        {
          guid: uuid,
          token: token,
        },
        'Invite token successfully generated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating user invite.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
