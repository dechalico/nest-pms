import { Injectable } from '@nestjs/common';
import { WarrantyRepository } from '../../repository/services/warrantyRepository.service';
import { EngineerRepository } from '../../repository/services/engineerRepository.service';
import { CreateWarranty, Warranty } from '../schemas/warranty.schema';
import { AppErrorCodes, AppResult } from '../../../common/app.result';

@Injectable()
export class WarrantyService {
  constructor(
    private readonly warrantyRepo: WarrantyRepository,
    private readonly engineerRepo: EngineerRepository,
  ) {}

  async createWarrantyAsync(args: CreateWarranty): Promise<AppResult<Warranty>> {
    try {
      if (args.engineers_id.length > 0) {
        const engineerRes = await this.engineerRepo.getAllAsync({
          filter: {
            _id: args.engineers_id,
          },
        });
        if (
          !engineerRes.succeeded ||
          !engineerRes.result ||
          engineerRes.result.length != args.engineers_id.length
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
        warranty_date: args.warranty_date,
        engineers_id: args.engineers_id,
        isDone: args.isDone,
        date_created: new Date(),
        date_updated: null,
      });
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when creating warranty.');
    }
  }
}
