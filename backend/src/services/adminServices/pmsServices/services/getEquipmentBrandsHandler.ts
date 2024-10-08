import { Injectable } from '@nestjs/common';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IGetEquipmentBrandHandler } from '../handlers/iGetEquipmentBrandsHandler';
import {
  GetEquipmentBrandArgs,
  GetEquipmentBrandResult,
  Pagination,
} from '../interactors/getEquipmentBrandsInteractor';
import { EquipmentBrandService } from '../../../baseServices/services/equipmentBrand.service';

@Injectable()
export class GetEquipmentBrandsHandler implements IGetEquipmentBrandHandler {
  constructor(private readonly equipmentBrandService: EquipmentBrandService) {}

  async executeAsync(args: GetEquipmentBrandArgs): Promise<AppResult<GetEquipmentBrandResult>> {
    try {
      const skip = args.pageSize * (args.currentPage - 1);
      const limit = args.pageSize;

      const brandsRes = await this.equipmentBrandService.getAllEquipmentBrandAsync({
        limit,
        skip,
      });
      if (!brandsRes.succeeded || !brandsRes.result) {
        return AppResult.createFailed(
          new Error(brandsRes.message),
          brandsRes.message,
          brandsRes.error.code,
        );
      }

      let pagination: Pagination | undefined = undefined;
      if (args.includePagination) {
        const brandsCountRes = await this.equipmentBrandService.countEquipmentBrandAsync();
        if (!brandsCountRes.succeeded) {
          return AppResult.createFailed(
            new Error(brandsCountRes.message),
            brandsCountRes.message,
            brandsCountRes.error.code,
          );
        }

        const totalCount = brandsCountRes.result;
        const totalPages = Math.ceil(totalCount / args.pageSize);

        pagination = {
          currentPage: args.currentPage,
          pageSize: args.pageSize,
          totalCount,
          totalPages,
        };
      }

      const result = brandsRes.result;
      return AppResult.createSucceeded(
        { equipmentBrands: result, pagination },
        'Successfully get all equipment brands.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting Equipment Brands.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
