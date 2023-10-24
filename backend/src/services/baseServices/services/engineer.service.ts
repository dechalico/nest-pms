import { Injectable } from '@nestjs/common';
import { EngineerRepository } from '../../repository/services/engineerRepository.service';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';
import {
  EngineerSchema,
  CreateEngineerSchema,
  UpdateEngineerSchema,
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
      if (!areaOfficeRes.Succeeded || !areaOfficeRes.Result) {
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
      if (!createRes.Succeeded || !createRes.Result) {
        return AppResult.createFailed(
          new Error(createRes.Message),
          createRes.Message,
          createRes.Error.code,
        );
      }
      const engineerSchema: EngineerSchema = createRes.Result;
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
        if (!areaOfficeRes.Succeeded || !areaOfficeRes.Result) {
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
      if (!updateRes.Succeeded || !updateRes.Result) {
        return AppResult.createFailed(
          new Error(updateRes.Message),
          updateRes.Message,
          updateRes.Error.code,
        );
      }

      const engineerSchema: EngineerSchema = updateRes.Result;
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

  async getAllEngineersAsync(): Promise<AppResult<Array<EngineerSchema>>> {
    try {
      const getRes = await this.engineerRepo.getAllAsync();
      if (!getRes.Succeeded || !getRes.Result) {
        return AppResult.createFailed(new Error(getRes.Message), getRes.Message, getRes.Error.code);
      }

      const result: Array<EngineerSchema> = getRes.Result;
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
      if (!getEngineerRes.Succeeded || !getEngineerRes.Result) {
        return AppResult.createFailed(
          new Error(getEngineerRes.Message),
          getEngineerRes.Message,
          getEngineerRes.Error.code,
        );
      }
      const result: EngineerSchema = getEngineerRes.Result;
      return AppResult.createSucceeded(result, 'Successfully get engineer by id.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting engineer by id.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
