import { BaseRepositoryService } from './baseRepository.service';
import { EquipmentBrand, GetAllArgs, CountAllArgs } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { OmitType } from '@nestjs/mapped-types';
import { AppResult } from 'src/common/app.result';

@Injectable()
export class EquipmentBrandRepository extends BaseRepositoryService<EquipmentBrand> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'equipment_brands', EquipmentBrand);
  }

  async getAllAsync(args: EquipmentBrandGetOptions): Promise<AppResult<any>> {
    try {
      const filter: any = {};
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.getAllAsync({ ...args, filter });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting equipment brands record.',
      );
    }
  }

  async countAsync(args: EquipmentBrandCountOptions): Promise<AppResult<any>> {
    try {
      const filter: any = {};
      if (args.filter?.like?.name) {
        filter.name = { $regex: args.filter.like.name, $options: 'i' };
      }
      return super.countAsync({ ...args, filter });
    } catch (error) {
      return AppResult.createFailed(error, 'An error occured when getting equipment brands count.');
    }
  }
}

class EquipmentBrandGetOptions extends OmitType(GetAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
  };
}

class EquipmentBrandCountOptions extends OmitType(CountAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
  };
}
