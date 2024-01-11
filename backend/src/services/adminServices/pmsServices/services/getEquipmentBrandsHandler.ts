import { Injectable } from '@nestjs/common';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IGetEquipmentBrandHandler } from '../handlers/iGetEquipmentBrandsHandler';
import {
  GetEquipmentBrandArgs,
  GetEquipmentBrandResult,
} from '../interactors/getEquipmentBrandsInteractor';
import { EquipmentBrandService } from '../../../baseServices/services/equipmentBrand.service';

@Injectable()
export class GetEquipmentBrandsHandler implements IGetEquipmentBrandHandler {
  constructor(private readonly equipmentBrandService: EquipmentBrandService) {}

  async executeAsync(args: GetEquipmentBrandArgs): Promise<AppResult<GetEquipmentBrandResult>> {
    try {
      const brandsRes = await this.equipmentBrandService.getAllEquipmentBrandAsync();
      if (!brandsRes.succeeded || !brandsRes.result) {
        return AppResult.createFailed(
          new Error(brandsRes.message),
          brandsRes.message,
          brandsRes.error.code,
        );
      }

      const result = brandsRes.result;
      return AppResult.createSucceeded(
        { equipmentBrands: result },
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
