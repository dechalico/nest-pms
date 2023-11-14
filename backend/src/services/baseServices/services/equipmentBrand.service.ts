import { Injectable } from '@nestjs/common';
import {
  CreateEquipmentBrand,
  EquipmentBrandSchema,
  UpdateEquipmentBrand,
} from '../schemas/equipmentBrand.schema';
import { AppResult, AppErrorCodes } from '../../../common/app.result';
import { EquipmentBrandRepository } from '../../repository/services/equipmentBrandRepository.service';

@Injectable()
export class EquipmentBrandService {
  constructor(private readonly equipmentBrandRepository: EquipmentBrandRepository) {}

  async createEquipmentBrandAsync(
    args: CreateEquipmentBrand,
  ): Promise<AppResult<EquipmentBrandSchema>> {
    try {
      const createRes = await this.equipmentBrandRepository.createAsync({
        _id: undefined,
        date_created: new Date(),
        date_updated: undefined,
        name: args.name,
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }

      const result: EquipmentBrandSchema = createRes.result;
      return AppResult.createSucceeded(result, 'Equipment Brand successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateEquipmentBrandAsync(
    args: UpdateEquipmentBrand,
  ): Promise<AppResult<EquipmentBrandSchema>> {
    try {
      const updateRes = await this.equipmentBrandRepository.updateAsync({
        _id: args.id,
        date_updated: new Date(),
        name: args.name,
      });
      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(
          new Error(updateRes.message),
          updateRes.message,
          updateRes.error.code,
        );
      }

      const result: EquipmentBrandSchema = updateRes.result;
      return AppResult.createSucceeded(result, 'Equipment Brand successfully updated.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getAllEquipmentBrandAsync(): Promise<AppResult<Array<EquipmentBrandSchema>>> {
    try {
      const getRes = await this.equipmentBrandRepository.getAllAsync();
      if (!getRes.succeeded || !getRes.result) {
        return AppResult.createFailed(new Error(getRes.message), getRes.message, getRes.error.code);
      }

      const result: Array<EquipmentBrandSchema> = getRes.result;
      return AppResult.createSucceeded(result, 'Equipment Brands successfully get');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
