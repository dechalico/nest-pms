import { BaseRepositoryService } from './baseRepository.service';
import { CountAllArgs, GetAllArgs, WarrantyType } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class WarrantyTypeRepository extends BaseRepositoryService<WarrantyType> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'warranty_types', WarrantyType);
  }

  async getAllAsync(args: WarrantyTypeGetOptions): Promise<any> {
    try {
      const filter: any = {};
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.getAllAsync({ ...args, filter });
    } catch (error) {
      return { error: error, message: 'An error occured when getting warranty types record.' };
    }
  }

  async countAsync(args: WarrantyTypeCountOptions): Promise<any> {
    try {
      const filter: any = {};
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.countAsync({ ...args, filter });
    } catch (error) {
      return { error: error, message: 'An error occured when getting warranty types count.' };
    }
  }
}

class WarrantyTypeGetOptions extends OmitType(GetAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
  };
}

class WarrantyTypeCountOptions extends OmitType(CountAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
  };
}
