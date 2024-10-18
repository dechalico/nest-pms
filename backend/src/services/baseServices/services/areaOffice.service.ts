import { Injectable } from '@nestjs/common';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import {
  CreateAreaOffice,
  AreaOfficeSchema,
  UpdateAreaOffice,
  GetAllArgs,
  CountAllArgs,
} from '../schemas/areaOffice.schema';

@Injectable()
export class AreaOfficeService {
  constructor(private readonly areaOfficeRepo: AreaOfficeRepository) {}

  async createAreaOfficeAsync(payload: CreateAreaOffice): Promise<AppResult<AreaOfficeSchema>> {
    try {
      const now = new Date();
      const createdRes = await this.areaOfficeRepo.createAsync({
        city: payload.city,
        name: payload.name,
        date_created: now,
        date_updated: undefined,
        _id: undefined,
      });
      if (!createdRes.succeeded || !createdRes.result) {
        return AppResult.createFailed(new Error(createdRes.message), createdRes.message);
      }

      const result: AreaOfficeSchema = createdRes.result;
      return AppResult.createSucceeded(result, 'Area Office successfully created.');
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when creating area office');
    }
  }

  async updateAreaOfficeAsync(payload: UpdateAreaOffice): Promise<AppResult<AreaOfficeSchema>> {
    try {
      const checkRes = await this.areaOfficeRepo.getByIdAsync(payload.id);
      if (!checkRes.succeeded || !checkRes.result) {
        return AppResult.createFailed(new Error(checkRes.message), checkRes.message);
      }

      const now = new Date();
      const updateRes = await this.areaOfficeRepo.updateAsync({
        _id: payload.id,
        date_updated: now,
        city: payload.city,
        name: payload.name,
      });

      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(new Error(updateRes.message), updateRes.message);
      }

      const result: AreaOfficeSchema = updateRes.result;
      return AppResult.createSucceeded(result, 'Area Office successfully updated.');
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when trying to update Area Office');
    }
  }

  async getAllAreaOffices(args: GetAllArgs): Promise<AppResult<Array<AreaOfficeSchema>>> {
    try {
      const filter: any = {
        like: args.like,
      };
      const getAllRes = await this.areaOfficeRepo.getAllAsync({
        limit: args.limit,
        skip: args.skip,
        filter,
      });
      if (!getAllRes.succeeded || !getAllRes.result) {
        return AppResult.createFailed(
          new Error(getAllRes.message),
          getAllRes.message,
          getAllRes.error.code,
        );
      }
      const result: Array<AreaOfficeSchema> = getAllRes.result;
      return AppResult.createSucceeded(result, 'Successfully get all area offices');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all area offices.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async countAreaOffices(args: CountAllArgs): Promise<AppResult<number>> {
    try {
      const filter: any = {
        like: args.like,
      };
      const countRes = await this.areaOfficeRepo.countAsync({
        filter,
      });
      if (!countRes.succeeded || !countRes.result) {
        return AppResult.createFailed(new Error(countRes.message), countRes.message);
      }
      return AppResult.createSucceeded(countRes.result, 'Successfully count area offices');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when counting area offices.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
