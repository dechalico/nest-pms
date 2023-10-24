import { BaseRepositoryService } from './baseRepository.service';
import { Client, GetAllArgs } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppResult, AppErrorCodes } from '../../../common/app.result';
import { objectIdCreator } from '../helper';
import {} from '../entities';

@Injectable()
export class ClientRepository extends BaseRepositoryService<Client> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'clients', Client);
  }

  async createAsync(entity: Client): Promise<AppResult<any>> {
    try {
      const { area_office_id } = entity;
      return super.createAsync({
        area_office_id: objectIdCreator(area_office_id),
        ...entity,
      });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating client entity.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateAsync(entity: Partial<Client>): Promise<AppResult<any>> {
    try {
      let { area_office_id } = entity;
      if (area_office_id) {
        area_office_id = objectIdCreator(area_office_id);
      }
      return super.updateAsync({ area_office_id, ...entity });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating client.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getAllAsync(args: GetAllArgs = { filter: {} }): Promise<AppResult<any>> {
    try {
      if (args.filter?.area_office_id) {
        args.filter.area_office_id = objectIdCreator(args.filter.area_office_id);
      }
      return super.getAllAsync(args);
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting clients record.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
