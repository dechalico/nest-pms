import { BaseRepositoryService } from './baseRepository.service';
import { AreaOffice, CountAllArgs, GetAllArgs } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class AreaOfficeRepository extends BaseRepositoryService<AreaOffice> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'area_offices', AreaOffice);
  }

  async getAllAsync(args: AreaOfficeGetOptions): Promise<any> {
    try {
      const filter: any = {};
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.getAllAsync({ ...args, filter });
    } catch (error) {
      return { error: error, message: 'An error occured when getting area offices record.' };
    }
  }

  async countAsync(args: AreaOfficeCountOptions): Promise<any> {
    try {
      const filter: any = {};
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.countAsync({ ...args, filter });
    } catch (error) {
      return { error: error, message: 'An error occured when getting area offices count.' };
    }
  }
}

class AreaOfficeGetOptions extends OmitType(GetAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
  };
}

class AreaOfficeCountOptions extends OmitType(CountAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
  };
}
