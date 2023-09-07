import { BaseRepositoryService } from './baseRepository.service';
import { Engineer } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
import { objectIdCreator } from '../helper';

@Injectable()
export class EngineerRepository extends BaseRepositoryService<Engineer> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'engineers', Engineer);
  }

  async createAsync(entity: Engineer): Promise<AppResult<any>> {
    try {
      entity.area_office_id = objectIdCreator(entity.area_office_id);
      return super.createAsync(entity);
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating engineer',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateAsync(entity: Partial<Engineer>): Promise<AppResult<any>> {
    try {
      if (entity.area_office_id) {
        entity.area_office_id = objectIdCreator(entity.area_office_id);
      }
      return super.updateAsync(entity);
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating engineer',
        AppErrorCodes.InternalError,
      );
    }
  }
}
