import { Injectable } from '@nestjs/common';
import {
  CreateWarrantyType,
  UpdateWarrantyType,
  WarrantyTypeSchema,
} from '../schemas/warrantyType.schema';
import { AppResult, AppErrorCodes } from '../../../common/app.result';
import { WarrantyTypeRepository } from '../../repository/services/warrantyTypeRepository.service';

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
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating warranty type.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
