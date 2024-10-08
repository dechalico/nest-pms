import { Injectable } from '@nestjs/common';
import {
  CreateWarrantyType,
  UpdateWarrantyType,
  WarrantyTypeSchema,
  GetAllArgs,
} from '../schemas/warrantyType.schema';
import { AppResult, AppErrorCodes } from '../../../common/app.result';
import { WarrantyTypeRepository } from '../../repository/services/warrantyTypeRepository.service';
import { algoToMessage } from '../../../utils/warrantyHelper';

/**
 * This is the algorithm format value
 * for future reference.
 *
 * {D|W|M|Y}|{interval}|{D|W|M|Y}|{Duration}
 * D=day
 * W=week
 * M=month
 * Y=year
 * interval= number of intervals in a specified day/week/month/year
 * duration= number of warranty durations in a specified day/week/month/year
 * Example:
 * M|3|Y|1
 *
 **/

@Injectable()
export class WarrantyTypeService {
  constructor(private readonly warrantyRepo: WarrantyTypeRepository) {}

  async createWarrantyType(args: CreateWarrantyType): Promise<AppResult<WarrantyTypeSchema>> {
    try {
      if (!this.validAlgorithm(args.algorithm)) {
        return AppResult.createFailed(
          new Error('Invalid algorithm'),
          'Invalid algorithm',
          AppErrorCodes.InvalidRequest,
        );
      }

      const createRes = await this.warrantyRepo.createAsync({
        algorithm: args.algorithm,
        _id: undefined,
        date_created: new Date(),
        name: args.name,
        date_updated: undefined,
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }

      const result: WarrantyTypeSchema = createRes.result;
      return AppResult.createSucceeded(result, 'Warranty type successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating warranty type.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateWarrantyType(args: UpdateWarrantyType): Promise<AppResult<WarrantyTypeSchema>> {
    try {
      if (args.algorithm && !this.validAlgorithm(args.algorithm)) {
        return AppResult.createFailed(
          new Error('Invalid algorithm'),
          'Invalid algorithm',
          AppErrorCodes.InvalidRequest,
        );
      }

      const checkWarrantyRes = await this.warrantyRepo.getByIdAsync(args.id);
      if (!checkWarrantyRes.succeeded || !checkWarrantyRes.result) {
        return AppResult.createFailed(
          new Error(checkWarrantyRes.message),
          checkWarrantyRes.message,
          checkWarrantyRes.error.code,
        );
      }

      const updateRes = await this.warrantyRepo.updateAsync({
        _id: args.id,
        algorithm: args.algorithm,
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

      const result: WarrantyTypeSchema = updateRes.result;
      return AppResult.createSucceeded(result, 'Warranty type successfully updated.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating warranty type',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getAllWarrantyTypes(args: GetAllArgs): Promise<AppResult<WarrantyTypeSchema[]>> {
    try {
      const getAllRes = await this.warrantyRepo.getAllAsync({
        limit: args.limit,
        skip: args.skip,
      });
      if (!getAllRes.succeeded || !getAllRes.result) {
        return AppResult.createFailed(
          new Error(getAllRes.message),
          getAllRes.message,
          getAllRes.error.code,
        );
      }

      let result: Array<WarrantyTypeSchema> = getAllRes.result;
      result = result.map((w) => {
        w.algoMessage = algoToMessage(w.algorithm);
        return w;
      });
      return AppResult.createSucceeded(result, 'Successfully get all warranty types');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all warranty types',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getWarrantyType(id: string): Promise<AppResult<WarrantyTypeSchema>> {
    try {
      const getWarranty = await this.warrantyRepo.getByIdAsync(id);
      if (!getWarranty.succeeded || !getWarranty.result) {
        return AppResult.createFailed(
          new Error(getWarranty.message),
          getWarranty.message,
          getWarranty.error.code,
        );
      }

      const result: WarrantyTypeSchema = getWarranty.result;
      return AppResult.createSucceeded(result, 'Succcessfully get warranty type');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting warranty type',
        AppErrorCodes.InternalError,
      );
    }
  }

  async countWarrantyTypes(): Promise<AppResult<number>> {
    try {
      const countRes = await this.warrantyRepo.countAsync();
      if (!countRes.succeeded) {
        return AppResult.createFailed(
          new Error(countRes.message),
          countRes.message,
          countRes.error.code,
        );
      }

      const result: number = countRes.result;
      return AppResult.createSucceeded(result, 'Warranty types count successfully get');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting warranty types count',
        AppErrorCodes.InternalError,
      );
    }
  }

  private validAlgorithm(algorithm: string): boolean {
    const [interval, intervalCount, duration, durationCount] = algorithm.split('|');
    const intervalInt = parseInt(intervalCount);
    const durationInt = parseInt(durationCount);

    if (!interval || !intervalInt || !duration || !durationInt) return false;

    const expectedValues = ['D', 'W', 'M', 'Y'];
    const intervalIndex = expectedValues.indexOf(interval);
    const durationIndex = expectedValues.indexOf(duration);

    // if interval or duration character is invalid
    return intervalIndex !== -1 && durationIndex !== -1;
  }
}
