import { Inject, Injectable } from '@nestjs/common';
import { BaseRepositoryService } from './baseRepository.service';
import { GetAllArgs, WarrantyHistory } from '../entities';
import { Db } from 'mongodb';
import { AppResult } from 'src/common/app.result';
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
}
