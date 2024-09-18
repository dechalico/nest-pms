import { Inject, Injectable } from '@nestjs/common';
import { BaseRepositoryService } from './baseRepository.service';
import { GetAllArgs, WarrantyHistory } from '../entities';
import { Db } from 'mongodb';
import { AppResult, AppErrorCodes } from 'src/common/app.result';
import { objectIdCreator } from '../helper';

@Injectable()
export class WarrantyHistoryRepository extends BaseRepositoryService<WarrantyHistory> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'warranty_histories', WarrantyHistory);
  }

  createAsync(entity: WarrantyHistory): Promise<AppResult<any>> {
    return super.createAsync({
      _id: undefined,
      pms_id: objectIdCreator(entity.pms_id),
      warranty_type_id: objectIdCreator(entity.warranty_type_id),
      warranties: entity.warranties.map((i) => objectIdCreator(i)),
      isLock: entity.isLock,
      date_created: entity.date_created,
      date_updated: entity.date_updated,
    });
  }

  getAllAsync(args?: GetAllArgs): Promise<AppResult<any>> {
    if (args?.filter?.pms_id) {
      args.filter.pms_id = objectIdCreator(args.filter.pms_id);
    }
    return super.getAllAsync(args);
  }

  async pmsWarrantyHistories(pms_id: string): Promise<AppResult<any>> {
    try {
      const stages = [];

      stages.push({
        $match: {
          _id: objectIdCreator(pms_id),
        },
      });

      stages.push({
        $lookup: {
          from: 'warranty_histories',
          localField: 'warranties',
          foreignField: '_id',
          as: 'warranties',
        },
      });

      stages.push({
        $unwind: '$warranties',
      });

      stages.push({
        $lookup: {
          from: 'engineers',
          localField: 'warranties.engineers_id',
          foreignField: '_id',
          as: 'warranties.engineers_id',
        },
      });

      stages.push({
        $group: {
          _id: '$_id',
          warranties: { $push: '$warranties' },
          pms_id: { $first: '$pms_id' },
          warranty_type_id: { $first: '$warranty_type_id' },
          isLock: { $first: '$isLock' },
          date_created: { $first: '$date_created' },
          date_updated: { $first: '$date_updated' },
        },
      });

      const cursor = this.table.aggregate(stages);
      const result: WarrantyHistory[] = [];

      for await (const doc of cursor) {
        const obj = new this.Wrapper();
        Object.assign(obj, doc);
        result.push(obj);
      }

      return AppResult.createSucceeded(result, 'Successfully get all warranty histories for pms.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all warranty histories for pms.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
