import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { IGetWarrantyTypesHandler } from '../handlers/iGetWarrantyTypesHandler';
import {
  GetWarrantyTypeArgs,
  GetWarrantyTypeResult,
  Pagination,
} from '../interactors/getWarrantyTypesInteractor';
import { Injectable } from '@nestjs/common';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';

@Injectable()
export class GetWarrantyTypesHandler implements IGetWarrantyTypesHandler {
  constructor(private readonly warrantyTypeService: WarrantyTypeService) {}

  async executeAsync(args: GetWarrantyTypeArgs): Promise<AppResult<GetWarrantyTypeResult>> {
    try {
      const skip = args.pageSize * (args.currentPage - 1);
      const limit = args.pageSize;

      const getWarrantyRes = await this.warrantyTypeService.getAllWarrantyTypes({
        limit,
        skip,
      });
      if (!getWarrantyRes.succeeded || !getWarrantyRes.result) {
        return AppResult.createFailed(
          new Error(getWarrantyRes.message),
          getWarrantyRes.message,
          getWarrantyRes.error.code,
        );
      }

      let pagination: Pagination | undefined = undefined;
      if (args.includePagination) {
        const warrantyCountRes = await this.warrantyTypeService.countWarrantyTypes();
        if (!warrantyCountRes.succeeded) {
          return AppResult.createFailed(
            new Error(warrantyCountRes.message),
            warrantyCountRes.message,
            warrantyCountRes.error.code,
          );
        }

        const totalCount = warrantyCountRes.result;
        const totalPages = Math.ceil(totalCount / args.pageSize);

        pagination = {
          currentPage: args.currentPage,
          pageSize: args.pageSize,
          totalCount,
          totalPages,
        };
      }

      return AppResult.createSucceeded(
        { warrantyTypes: getWarrantyRes.result, pagination },
        'Successfully get warranty types.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting warranty types.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
