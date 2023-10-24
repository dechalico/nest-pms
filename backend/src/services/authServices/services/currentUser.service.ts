import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { ICurrentUserHandler } from '../handlers/ICurrentUserHandler';
import { CurrentUserArgs, CurrentUserResult } from '../interactors/currentUserInteractor';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../../baseServices/services/user.service';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUser implements ICurrentUserHandler {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly userService: UserService,
  ) {}

  async executeAsync(args: CurrentUserArgs): Promise<AppResult<CurrentUserResult>> {
    try {
      const userId = this.request['user'].id;
      const userRes = await this.userService.getUserByIdAsync(userId);
      if (!userRes.Succeeded || !userRes.Result) {
        return AppResult.createFailed(
          new Error('Unable to determine current user.'),
          'Unable to determine current user.',
          AppErrorCodes.InternalError,
        );
      }
      const user = userRes.Result;
      return AppResult.createSucceeded(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          username: user.username,
          areaOfficeId: user.areaOfficeId,
        },
        'Successfully get current user.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting current user',
        AppErrorCodes.InternalError,
      );
    }
  }
}
