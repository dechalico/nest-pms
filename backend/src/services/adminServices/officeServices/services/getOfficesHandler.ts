import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { IGetOfficesHandler } from '../handlers/IGetOfficesHandler';
import {
  GetOfficesArgs,
  GetOfficesResult,
  Office,
  Pagination,
} from '../interactors/getOfficesInteractor';
import { AreaOfficeService } from '../../../baseServices/services/areaOffice.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetOfficesHandler implements IGetOfficesHandler {
  constructor(private readonly areaOfficeService: AreaOfficeService) {}

  async executeAsync(args: GetOfficesArgs): Promise<AppResult<GetOfficesResult>> {
    try {
      const skip = args.pageSize * (args.currentPage - 1);
      const limit = args.pageSize;

      const getRes = await this.areaOfficeService.getAllAreaOffices({
        limit,
        skip,
      });
      if (!getRes.succeeded || !getRes.result) {
        return AppResult.createFailed(new Error(getRes.message), getRes.message, getRes.error.code);
      }

      let pagination: Pagination | undefined = undefined;
      if (args.includePagination) {
        const countRes = await this.areaOfficeService.countAreaOffices();
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

      const offices: Array<Office> = getRes.result;
      return AppResult.createSucceeded(
        {
          offices,
          pagination,
        },
        'Successfully get offices',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting offices',
        AppErrorCodes.InternalError,
      );
    }
  }
}
