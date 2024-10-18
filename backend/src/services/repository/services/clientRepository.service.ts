import { BaseRepositoryService } from './baseRepository.service';
import { Client, CountAllArgs, GetAllArgs } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppResult, AppErrorCodes } from '../../../common/app.result';
import { objectIdCreator } from '../helper';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class ClientRepository extends BaseRepositoryService<Client> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'clients', Client);
  }

  async createAsync(entity: Client): Promise<AppResult<any>> {
    try {
      const { area_office_id, ...rest } = entity;
      return super.createAsync({
        area_office_id: objectIdCreator(area_office_id),
        ...rest,
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

  async getAllAsync(args: ClientOptions = { filter: {} }): Promise<AppResult<any>> {
    try {
      const filter: any = {};
      if (args.filter?.area_office_id) {
        filter.area_office_id = objectIdCreator(args.filter.area_office_id);
      }
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.getAllAsync({ ...args, filter });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting clients record.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async countAsync(args?: ClientCountOptions): Promise<AppResult<number>> {
    try {
      const filter: any = {};
      if (args.filter?.area_office_id) {
        filter.area_office_id = objectIdCreator(args.filter.area_office_id);
      }
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.countAsync({ filter });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting clients record.',
        AppErrorCodes.InternalError,
      );
    }
  }
}

class ClientOptions extends OmitType(GetAllArgs, ['filter']) {
  filter: {
    _id?: any;
    area_office_id?: any;
    like?: {
      name?: string;
    };
  };
}

class ClientCountOptions extends OmitType(CountAllArgs, ['filter']) {
  filter: {
    _id?: any;
    area_office_id?: any;
    like?: {
      name?: string;
    };
  };
}
