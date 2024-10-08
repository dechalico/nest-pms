import { Injectable } from '@nestjs/common';
import { IGetUsersHandler } from '../handlers/iGetUsersHandler';
import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { GetUsersArgs, GetUsersResult, Pagination, User } from '../interactors/getUsersInteractor';
import { UserService } from '../../../baseServices/services/user.service';

@Injectable()
export class GetUsersHandler implements IGetUsersHandler {
  constructor(private readonly userService: UserService) {}

  async executeAsync(args: GetUsersArgs): Promise<AppResult<GetUsersResult>> {
    try {
      const skip = args.pageSize * (args.currentPage - 1);
      const limit = args.pageSize;

      const getRes = await this.userService.getAllUsers({
        includes: args.includes,
        limit,
        skip,
      });
      if (!getRes.succeeded || !getRes.result) {
        return AppResult.createFailed(new Error(getRes.message), getRes.message, getRes.error.code);
      }

      const result: User[] = getRes.result;

      let pagination: Pagination | undefined = undefined;
      if (args.includePagination) {
        const countRes = await this.userService.countUsers();
        if (!countRes.succeeded) {
          return AppResult.createFailed(
            new Error(countRes.message),
            countRes.message,
            countRes.error.code,
          );
        }

        const totalCount = countRes.result;
        const totalPages = Math.ceil(totalCount / args.pageSize);

        pagination = {
          currentPage: args.currentPage,
          pageSize: args.pageSize,
          totalCount,
          totalPages,
        };
      }

      return AppResult.createSucceeded(
        { users: result, pagination },
        'Successfully get all users.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured in GetUsersHandler',
        AppErrorCodes.InternalError,
      );
    }
  }
}
