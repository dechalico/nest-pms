import { Injectable } from '@nestjs/common';
import { EngineerRepository } from '../../repository/services/engineerRepository.service';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';
import {
  EngineerSchema,
  CreateEngineerSchema,
  UpdateEngineerSchema,
  GetEngineersArgs,
  CountAllArgs,
} from '../schemas/engineer.schema';
import { AppErrorCodes, AppResult } from '../../../common/app.result';

@Injectable()
export class EngineerService {
  constructor(
    private readonly engineerRepo: EngineerRepository,
    private readonly areaOfficeRepo: AreaOfficeRepository,
  ) {}

  // prettier-ignore
  async createEngineerAsync(args: CreateEngineerSchema): Promise<AppResult<EngineerSchema>> {
    try {
      // validate area office id
      const areaOfficeRes = await this.areaOfficeRepo.getByIdAsync(
        args.areaOfficeId,
      );
      if (!areaOfficeRes.succeeded || !areaOfficeRes.result) {
        return AppResult.createFailed(
          new Error('Invalid area office id. Invalid request.'),
          'Invalid area office id. Invalid request.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const createRes = await this.engineerRepo.createAsync({
        _id: undefined,
        area_office_id: args.areaOfficeId,
        date_created: new Date(),
        date_updated: undefined,
        firstName: args.firstName,
        lastName: args.lastName,
        middleName: args.middleName,
        created_by: args.createdBy
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }
      const engineerSchema: EngineerSchema = createRes.result;
      return AppResult.createSucceeded(
        engineerSchema,
        'Engineer successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }

  // prettier-ignore
  async updateEngineerAsync(args: UpdateEngineerSchema): Promise<AppResult<EngineerSchema>> {
    try {
      // validate area office id
      if (args.areaOfficeId) {
        const areaOfficeRes = await this.areaOfficeRepo.getByIdAsync(
          args.areaOfficeId,
        );
        if (!areaOfficeRes.succeeded || !areaOfficeRes.result) {
          return AppResult.createFailed(
            new Error('Invalid area office id. Invalid request.'),
            'Invalid area office id. Invalid request.',
            AppErrorCodes.InvalidRequest,
          );
        }
      }

      const updateRes = await this.engineerRepo.updateAsync({
        _id: args.id,
        area_office_id: args.areaOfficeId,
        date_updated: new Date(),
        firstName: args.firstName,
        lastName: args.lastName,
        middleName: args.middleName,
      });
      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(
          new Error(updateRes.message),
          updateRes.message,
          updateRes.error.code,
        );
      }

      const engineerSchema: EngineerSchema = updateRes.result;
      return AppResult.createSucceeded(
        engineerSchema,
        'Engineer successfully updated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getAllEngineersAsync(args: GetEngineersArgs): Promise<AppResult<Array<EngineerSchema>>> {
    try {
      const filter: any = {
        like: args.like,
      };
      const getRes = await this.engineerRepo.getAllAsync({
        include: {
          area_office: args.includes?.areaOffice,
        },
        limit: args.limit,
        skip: args.skip,
        filter,
      });
      if (!getRes.succeeded || !getRes.result) {
        return AppResult.createFailed(new Error(getRes.message), getRes.message, getRes.error.code);
      }

      const result: Array<EngineerSchema> = getRes.result;
      return AppResult.createSucceeded(result, 'Successfully get all engineers.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all engineers.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getEngineerAsync(id: string): Promise<AppResult<EngineerSchema>> {
    try {
      const getEngineerRes = await this.engineerRepo.getByIdAsync(id);
      if (!getEngineerRes.succeeded || !getEngineerRes.result) {
        return AppResult.createFailed(
          new Error(getEngineerRes.message),
          getEngineerRes.message,
          getEngineerRes.error.code,
        );
      }
      const result: EngineerSchema = getEngineerRes.result;
      return AppResult.createSucceeded(result, 'Successfully get engineer by id.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting engineer by id.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async countEngineers(args: CountAllArgs): Promise<AppResult<number>> {
    try {
      const filter: any = {
        like: args.like,
      };
      const countRes = await this.engineerRepo.countAsync({
        filter,
      });
      if (!countRes.succeeded) {
        return AppResult.createFailed(
          new Error(countRes.message),
          countRes.message,
          countRes.error.code,
        );
      }
      const result: number = countRes.result;
      return AppResult.createSucceeded(result, 'Engineers count successfully get');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting engineers count.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
