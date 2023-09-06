import { Injectable } from '@nestjs/common';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import {
  CreateAreaOffice,
  AreaOfficeSchema,
  UpdateAreaOffice,
} from '../schemas/areaOffice.schema';

@Injectable()
export class AreaOfficeService {
  constructor(private readonly areaOfficeRepo: AreaOfficeRepository) {}

  async createAreaOfficeAsync(
    payload: CreateAreaOffice,
  ): Promise<AppResult<AreaOfficeSchema>> {
    try {
      const now = new Date();
      const createdRes = await this.areaOfficeRepo.createAsync({
        city: payload.city,
        name: payload.name,
        date_created: now,
        date_updated: undefined,
        _id: undefined,
      });
      if (!createdRes.Succeeded || !createdRes.Result) {
        return AppResult.createFailed(
          new Error(createdRes.Message),
          createdRes.Message,
        );
      }

      const result: AreaOfficeSchema = createdRes.Result;
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
      const checkRes = await this.areaOfficeRepo.getByIdAsync(payload.id);
      if (!checkRes.Succeeded || !checkRes.Result) {
        return AppResult.createFailed(
          new Error(checkRes.Message),
          checkRes.Message,
        );
      }

      const now = new Date();
      const updateRes = await this.areaOfficeRepo.updateAsync({
        _id: payload.id,
        date_updated: now,
        city: payload.city,
        name: payload.name,
      });

      if (!updateRes.Succeeded || !updateRes.Result) {
        return AppResult.createFailed(
          new Error(updateRes.Message),
          updateRes.Message,
        );
      }

      const result: AreaOfficeSchema = updateRes.Result;
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

  async getAllAreaOffices(): Promise<AppResult<Array<AreaOfficeSchema>>> {
    try {
      const getAllRes = await this.areaOfficeRepo.getAllAsync();
      if (!getAllRes.Succeeded || !getAllRes.Result) {
        return AppResult.createFailed(
          new Error(getAllRes.Message),
          getAllRes.Message,
          getAllRes.Error.code,
        );
      }
      const result: Array<AreaOfficeSchema> = getAllRes.Result;
      return AppResult.createSucceeded(
        result,
        'Successfully get all area offices',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all area offices.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
