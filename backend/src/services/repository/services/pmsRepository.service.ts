import { BaseRepositoryService } from './baseRepository.service';
import { Pms } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppResult } from 'src/common/app.result';

@Injectable()
export class PmsRepository extends BaseRepositoryService<Pms> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'pms', Pms);
  }

  async updateAsync(entity: Partial<Pms>): Promise<AppResult<Pms>> {
    try {
      const { warranties, ...rest } = entity;
      return super.updateAsync(rest);
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to get all entities.',
      );
    }
  }
}
