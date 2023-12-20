import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IProfileHandler } from '../handlers/iProfileHandler';
import { ProfileArgs, ProfileResult } from '../interactors/profileInteractor';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileHandler implements IProfileHandler {
  constructor(private readonly currentUserHandler: ICurrentUserHandler) {}

  async executeAsync(args: ProfileArgs): Promise<AppResult<ProfileResult>> {
    try {
      const currentUserRes = await this.currentUserHandler.executeAsync({});
      if (!currentUserRes.succeeded || !currentUserRes.result) {
        return AppResult.createFailed(
          new Error(currentUserRes.message),
          currentUserRes.message,
          currentUserRes.error.code,
        );
      }
      return AppResult.createSucceeded(currentUserRes.result, 'Profile successfuly get');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured in ProfileHandler',
        AppErrorCodes.InternalError,
      );
    }
  }
}
