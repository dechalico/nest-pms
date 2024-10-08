import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { IGetEngineersHandler } from '../handlers/iGetEngineersHandler';
import {
  GetEngineersArgs,
  GetEngineersResult,
  Engineer,
  Pagination,
} from '../interactors/getEngineersInteractor';
import { Injectable } from '@nestjs/common';
import { EngineerService } from '../../../baseServices/services/engineer.service';

@Injectable()
export class GetEngineersHandler implements IGetEngineersHandler {
  constructor(private readonly engineerService: EngineerService) {}

  async executeAsync(args: GetEngineersArgs): Promise<AppResult<GetEngineersResult>> {
    try {
      const skip = args.pageSize * (args.currentPage - 1);
      const limit = args.pageSize;

      const engineerRes = await this.engineerService.getAllEngineersAsync({
        includes: args.includes,
        limit,
        skip,
      });
      if (!engineerRes.succeeded || !engineerRes.result) {
        return AppResult.createFailed(
          new Error(engineerRes.message),
          engineerRes.message,
          engineerRes.error.code,
        );
      }
      const result: Array<Engineer> = engineerRes.result;

      let pagination: Pagination | undefined = undefined;
      if (args.includePagination) {
        const countRes = await this.engineerService.countEngineers();
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
        { engineers: result, pagination },
        'Successfully get all engineers',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to get engineers.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
