import { Injectable } from '@nestjs/common';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';
import { AppResult } from 'src/common/app.result';
import {
  CreateAreaOffice,
  AreaOfficeSchema,
  UpdateAreaOffice,
} from '../schemas/areaOffice.schema';
import { plainToClass } from 'class-transformer';
import { AreaOffice } from '../../repository/entities';

@Injectable()
export class AreaOfficeService {
  constructor(private readonly areaOfficeRepo: AreaOfficeRepository) {}

  async createAreaOfficeAsync(
    payload: CreateAreaOffice,
  ): Promise<AppResult<AreaOfficeSchema>> {
    try {
      const now = new Date();
      const createdRes = await this.areaOfficeRepo.createAsync({
        ...payload,
        date_created: now,
        date_updated: now,
        _id: undefined,
      });
      if (!createdRes.Succeeded || !createdRes.Result) {
        return AppResult.createFailed(
          new Error(createdRes.Message),
          createdRes.Message,
        );
      }

      const result = plainToClass(AreaOfficeSchema, createdRes.Result);
      return AppResult.createSucceeded(
        result,
        'Area Office successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating area office',
      );
    }
  }

  async updateAreaOfficeAsync(
    payload: UpdateAreaOffice,
  ): Promise<AppResult<AreaOfficeSchema>> {
    try {
      const { id } = payload;
      const checkRes = await this.areaOfficeRepo.getByIdAsync(id);
      if (!checkRes.Succeeded || !checkRes.Result) {
        return AppResult.createFailed(
          new Error(checkRes.Message),
          checkRes.Message,
        );
      }

      const objToUpdate = plainToClass(AreaOffice, payload);
      objToUpdate.date_updated = new Date();
      const updateRes = await this.areaOfficeRepo.updateAsync(objToUpdate);

      if (!updateRes.Succeeded || !updateRes.Result) {
        return AppResult.createFailed(
          new Error(updateRes.Message),
          updateRes.Message,
        );
      }

      const result = plainToClass(AreaOfficeSchema, updateRes.Result);
      return AppResult.createSucceeded(
        result,
        'Area Office successfully updated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to update Area Office',
      );
    }
  }
}
