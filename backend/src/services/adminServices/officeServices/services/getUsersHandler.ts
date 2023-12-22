import { Injectable } from '@nestjs/common';
import { IGetUsersHandler } from '../handlers/iGetUsersHandler';
import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { GetUsersArgs, GetUsersResult, User } from '../interactors/getUsersInteractor';
import { UserService } from '../../../baseServices/services/user.service';

@Injectable()
export class GetUsersHandler implements IGetUsersHandler {
  constructor(private readonly userService: UserService) {}

  async executeAsync(args: GetUsersArgs): Promise<AppResult<GetUsersResult>> {
    try {
      const getRes = await this.userService.getAllUsers({
        includes: args.includes,
      });
      if (!getRes.succeeded || !getRes.result) {
        return AppResult.createFailed(new Error(getRes.message), getRes.message, getRes.error.code);
      }

      const result: User[] = getRes.result;
      return AppResult.createSucceeded({ users: result }, 'Successfully get all users.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured in GetUsersHandler',
        AppErrorCodes.InternalError,
      );
    }
  }
}
