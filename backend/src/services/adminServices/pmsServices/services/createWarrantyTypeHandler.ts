import { Injectable } from '@nestjs/common';
import { ICreateWarrantyType } from '../handlers/iCreateWarrantyTypeHandler';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import {
  CreateWarrantyTypeArgs,
  CreateWarrantyTypeResult,
} from '../interactors/createWarrantyTypeInteractor';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';

@Injectable()
export class CreateWarrantyTypeHandler implements ICreateWarrantyType {
  constructor(private readonly warrantyTypeService: WarrantyTypeService) {}

  async executeAsync(args: CreateWarrantyTypeArgs): Promise<AppResult<CreateWarrantyTypeResult>> {
    try {
      const createRes = await this.warrantyTypeService.createWarrantyType(args);
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }

      const result: CreateWarrantyTypeResult = createRes.result;
      return AppResult.createSucceeded(result, 'Warranty type successfully created');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating warranty type.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
