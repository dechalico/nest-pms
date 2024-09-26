import { Inject, Injectable } from '@nestjs/common';
import { Warranty } from '../entities';
import { BaseRepositoryService } from './baseRepository.service';
import { Db } from 'mongodb';
import { AppResult } from 'src/common/app.result';
import { objectIdCreator } from '../helper';

@Injectable()
export class WarrantyRepository extends BaseRepositoryService<Warranty> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'warranties', Warranty);
  }

  createAsync(entity: Warranty): Promise<AppResult<any>> {
    if (entity.engineers_id) {
      entity.engineers_id = entity.engineers_id.map((i) => objectIdCreator(i));
    }
    return super.createAsync(entity);
  }

  updateAsync(entity: Partial<Warranty>): Promise<AppResult<any>> {
    if (entity.engineers_id) {
      entity.engineers_id = entity.engineers_id.map((i) => objectIdCreator(i));
    }
    return super.updateAsync(entity);
  }
}
