import { Injectable } from '@nestjs/common';
import { WarrantyRepository } from '../../repository/services/warrantyRepository.service';
import { EngineerRepository } from '../../repository/services/engineerRepository.service';
import {
  CreateWarranty,
  Warranty,
  UpdateWarranty,
  GetAllWarrantiesArgs,
} from '../schemas/warranty.schema';
import { AppErrorCodes, AppResult } from '../../../common/app.result';

@Injectable()
export class WarrantyService {
  constructor(
    private readonly warrantyRepo: WarrantyRepository,
    private readonly engineerRepo: EngineerRepository,
  ) {}

  async createWarrantyAsync(args: CreateWarranty): Promise<AppResult<Warranty>> {
    try {
      if (args.engineers.length > 0) {
        const engineerRes = await this.engineerRepo.getAllAsync({
          filter: {
            _id: args.engineers,
          },
        });
        if (
          !engineerRes.succeeded ||
          !engineerRes.result ||
          engineerRes.result.length != args.engineers.length
        ) {
          return AppResult.createFailed(
            new Error('Invalid engineer ids'),
            'Invalid engineer ids',
            AppErrorCodes.InvalidRequest,
          );
        }
      }

      return this.warrantyRepo.createAsync({
        _id: undefined,
        name: args.name,
        warranty_date: args.warrantyDate,
        engineers_id: args.engineers,
        isDone: args.isDone,
        date_created: new Date(),
        date_updated: null,
      });
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when creating warranty.');
    }
  }

  async updateWarrantyAsync(args: UpdateWarranty): Promise<AppResult<Warranty>> {
    try {
      if (args.engineers && args.engineers.length > 0) {
        const engineerRes = await this.engineerRepo.getAllAsync({
          filter: {
            _id: args.engineers,
          },
        });
        if (
          !engineerRes.succeeded ||
          !engineerRes.result ||
          engineerRes.result.length != args.engineers.length
        ) {
          return AppResult.createFailed(
            new Error('Invalid engineer ids'),
            'Invalid engineer ids',
            AppErrorCodes.InvalidRequest,
          );
        }
      }

      return this.warrantyRepo.updateAsync({
        _id: args.id,
        name: args.name,
        warranty_date: args.warrantyDate,
        engineers_id: args.engineers,
        isDone: args.isDone,
        date_updated: new Date(),
      });
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when updating warranty.');
    }
  }

  async getAllWarrantiesAsync(args: GetAllWarrantiesArgs): Promise<AppResult<Warranty[]>> {
    try {
      const filter: any = {};
      if (args.id) {
        filter.id = args.id;
      }
      return this.warrantyRepo.getAllAsync({ filter });
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when getting all warranties.');
    }
  }
}
