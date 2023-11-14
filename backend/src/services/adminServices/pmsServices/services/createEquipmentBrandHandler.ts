import { Injectable } from '@nestjs/common';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { ICreateEquipmentBrandHandler } from '../handlers/iCreateEquipmentBrandHandler';
import {
  CreateEquipmentBrandArgs,
  CreateEquipmentBrandResult,
} from '../interactors/createEquipmentBrandInteractor';
import { EquipmentBrandService } from '../../../baseServices/services/equipmentBrand.service';

@Injectable()
export class CreateEquipmentBrandHandler implements ICreateEquipmentBrandHandler {
  constructor(private readonly equipmentBrandService: EquipmentBrandService) {}

  async executeAsync(
    args: CreateEquipmentBrandArgs,
  ): Promise<AppResult<CreateEquipmentBrandResult>> {
    try {
      const createRes = await this.equipmentBrandService.createEquipmentBrandAsync(args);
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }

      const result: CreateEquipmentBrandResult = createRes.result;
      return AppResult.createSucceeded(result, 'Equipment Brand successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating equipment brand.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
