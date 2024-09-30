import { Injectable } from '@nestjs/common';
import { WarrantyHistoryRepository } from '../../repository/services/warrantyHistoryRepository.service';
import {
  CreateWarrantyHistory,
  WarrantyHistorySchema,
  GetWarrantyHistories,
} from '../schemas/warrantyHistory.schema';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { WarrantyTypeRepository } from '../../repository/services/warrantyTypeRepository.service';
import { PmsRepository } from '../../repository/services/pmsRepository.service';

@Injectable()
export class WarrantyHistoryService {
  constructor(
    private readonly warrantyHistoryRepo: WarrantyHistoryRepository,
    private readonly pmsRepo: PmsRepository,
    private readonly warrantyTypeRepo: WarrantyTypeRepository,
  ) {}

  async createWarrantyHistory(
    args: CreateWarrantyHistory,
  ): Promise<AppResult<WarrantyHistorySchema>> {
    try {
      const warrantyTypeRes = await this.warrantyTypeRepo.getByIdAsync(args.warrantyTypeId);
      if (!warrantyTypeRes.succeeded || !warrantyTypeRes.result) {
        return AppResult.createFailed(
          new Error('Invalid warranty type id.'),
          'Invalid warranty type id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const pmsRes = await this.pmsRepo.getByIdAsync(args.pmsId);
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(
          new Error('Invalid pms id.'),
          'Invalid pms id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      return this.warrantyHistoryRepo.createAsync({
        _id: undefined,
        pms_id: args.pmsId,
        warranty_type_id: args.warrantyTypeId,
        warranties: args.warranties,
        isLock: args.isLock,
        date_created: new Date(),
        date_updated: undefined,
      });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating warranty history.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getWarrantyHitories(
    args: GetWarrantyHistories,
  ): Promise<AppResult<Array<WarrantyHistorySchema>>> {
    try {
      const filter = {};
      if (args.pmsId) {
        filter['pms_id'] = args.pmsId;
      }
      return this.warrantyHistoryRepo.getAllAsync({ filter: filter });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting warranty histories.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async pmsWarrantyHistories(pms_id: string): Promise<AppResult<WarrantyHistorySchema[]>> {
    try {
      const pmsRes = await this.pmsRepo.getByIdAsync(pms_id);
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(
          new Error('Invalid pms id.'),
          'Invalid pms id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const result = await this.warrantyHistoryRepo.pmsWarrantyHistories(pms_id);
      if (!result.succeeded || !result.result) {
        return AppResult.createFailed(
          new Error(result.message),
          result.message,
          AppErrorCodes.InvalidRequest,
        );
      }

      return AppResult.createSucceeded(
        result.result,
        'Successfully get all warranty histories for pms.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all warranty histories for pms.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getWarrantyHistoryById(id: string): Promise<AppResult<WarrantyHistorySchema>> {
    try {
      const result = await this.warrantyHistoryRepo.getByIdAsync(id);
      if (!result.succeeded || !result.result) {
        return AppResult.createFailed(
          new Error('Invalid warranty history id.'),
          'Invalid warranty history id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      return AppResult.createSucceeded(result.result, 'Successfully retrieved warranty history.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occurred when getting warranty history by id.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
