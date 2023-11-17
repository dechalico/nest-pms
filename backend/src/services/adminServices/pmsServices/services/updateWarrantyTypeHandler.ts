import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IUpdateWarrantyTypeHandler } from '../handlers/iUpdateWarrantyTypeHandler';
import {
  UpdateWarrantyTypeArgs,
  UpdateWarrantypeResult,
} from '../interactors/updateWarrantyTypeInteractor';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateWarrantyTypeHandler implements IUpdateWarrantyTypeHandler {
  constructor(private readonly warrantyTypeService: WarrantyTypeService) {}

  async executeAsync(args: UpdateWarrantyTypeArgs): Promise<AppResult<UpdateWarrantypeResult>> {
    try {
      const updateRes = await this.warrantyTypeService.updateWarrantyType(args);
      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(
          new Error(updateRes.message),
          updateRes.message,
          updateRes.error.code,
        );
      }

      const result: UpdateWarrantypeResult = updateRes.result;
      return AppResult.createSucceeded(result, 'Warranty type successfully updated.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating warranty type.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
