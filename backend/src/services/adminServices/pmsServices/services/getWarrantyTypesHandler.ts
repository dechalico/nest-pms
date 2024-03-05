import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { IGetWarrantyTypesHandler } from '../handlers/iGetWarrantyTypesHandler';
import {
  GetWarrantyTypeArgs,
  GetWarrantyTypeResult,
} from '../interactors/getWarrantyTypesInteractor';
import { Injectable } from '@nestjs/common';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';

@Injectable()
export class GetWarrantyTypesHandler implements IGetWarrantyTypesHandler {
  constructor(private readonly warrantyTypeService: WarrantyTypeService) {}

  async executeAsync(args: GetWarrantyTypeArgs = {}): Promise<AppResult<GetWarrantyTypeResult>> {
    try {
      const getWarrantyRes = await this.warrantyTypeService.getAllWarrantyTypes();
      if (!getWarrantyRes.succeeded || !getWarrantyRes.result) {
        return AppResult.createFailed(
          new Error(getWarrantyRes.message),
          getWarrantyRes.message,
          getWarrantyRes.error.code,
        );
      }

      return AppResult.createSucceeded(
        { warrantyTypes: getWarrantyRes.result },
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
