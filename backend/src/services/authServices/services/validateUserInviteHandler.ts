import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { IValidateUserInviteHandler } from '../handlers/IValidateUserInviteHandler';
import {
  ValidateUserInviteArgs,
  ValidateUserInviteResult,
} from '../interactors/validateUserInviteInteractor';
import { Injectable } from '@nestjs/common';
import { InviteTokenService } from '../../baseServices/services/inviteToken.service';

@Injectable()
export class ValidateUserInviteHandler implements IValidateUserInviteHandler {
  constructor(private readonly inviteService: InviteTokenService) {}

  async executeAsync(args: ValidateUserInviteArgs): Promise<AppResult<ValidateUserInviteResult>> {
    try {
      const getTokenRes = await this.inviteService.getTokenAsync(args.guid, args.token);
      if (!getTokenRes.succeeded || !getTokenRes.result) {
        return AppResult.createFailed(
          new Error('Invalid guid and token.'),
          'Invalid guid and token.',
        );
      }
      const inviteToken = getTokenRes.result;
      return AppResult.createSucceeded(
        {
          createdBy: inviteToken.createdBy,
          dateUsed: inviteToken.dateUsed,
          isvalid: !inviteToken.isUsed,
          usedBy: inviteToken.usedBy,
          areaOfficeId: inviteToken.areaOfficeId,
          id: inviteToken.id,
        },
        'Invite token successfully validated',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when validating user invite tokens.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
