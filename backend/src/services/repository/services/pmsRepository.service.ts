import { BaseRepositoryService } from './baseRepository.service';
import { CountAllArgs, GetAllArgs, Pms } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator } from '../helper';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class PmsRepository extends BaseRepositoryService<Pms> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'pms', Pms);
  }

  createAsync(entity: Pms): Promise<AppResult<any>> {
    entity.client._id = objectIdCreator(entity.client._id);
    entity.equipmentBrand._id = objectIdCreator(entity.equipmentBrand._id);
    entity.engineers.forEach((e) => (e._id = objectIdCreator(e._id)));
    return super.createAsync({
      _id: undefined,
      area_office_id: objectIdCreator(entity.area_office_id),
      client: entity.client,
      date_created: entity.date_created,
      date_updated: entity.date_updated,
      dateInstalled: entity.dateInstalled,
      engineers: entity.engineers,
      equipmentBrand: entity.equipmentBrand,
      fsrNumber: entity.fsrNumber,
      model: entity.model,
      remarks: entity.remarks,
      serialNumbers: entity.serialNumbers,
      status: entity.status,
    });
  }

  getAllAsync(args: PmsGetOptions): Promise<AppResult<any>> {
    const filter: any = {};
    const andFilters = [];

    if (args.filter.areaOfficeId) {
      andFilters.push({ area_office_id: objectIdCreator(args.filter.areaOfficeId) });
    }
    if (args.filter.like?.fsrNumber) {
      andFilters.push({ fsrNumber: { $regex: args.filter.like.fsrNumber, $options: 'i' } });
    }
    if (args.filter.like?.model) {
      andFilters.push({ model: { $regex: args.filter.like.model, $options: 'i' } });
    }
    if (args.filter.like?.serialNumbers) {
      andFilters.push({
        serialNumbers: {
          $elemMatch: { $regex: args.filter.like.serialNumbers, $options: 'i' },
        },
      });
    }
    if (args.filter.like?.principal) {
      andFilters.push({
        'equipmentBrand.name': { $regex: args.filter.like.principal, $options: 'i' },
      });
    }
    if (args.filter.like?.client) {
      andFilters.push({ 'client.name': { $regex: args.filter.like.client, $options: 'i' } });
    }

    if (andFilters.length > 0) {
      filter.$and = andFilters;
    }

    return super.getAllAsync({
      ...args,
      filter,
    });
  }

  countAsync(args: PmsCountOptions): Promise<AppResult<number>> {
    const filter: any = {};
    const andFilters = [];

    if (args.filter.areaOfficeId) {
      andFilters.push({ area_office_id: objectIdCreator(args.filter.areaOfficeId) });
    }
    if (args.filter.like?.fsrNumber) {
      andFilters.push({ fsrNumber: { $regex: args.filter.like.fsrNumber, $options: 'i' } });
    }
    if (args.filter.like?.model) {
      andFilters.push({ model: { $regex: args.filter.like.model, $options: 'i' } });
    }
    if (args.filter.like?.serialNumbers) {
      andFilters.push({
        serialNumbers: {
          $elemMatch: { $regex: args.filter.like.serialNumbers, $options: 'i' },
        },
      });
    }
    if (args.filter.like?.principal) {
      andFilters.push({
        'equipmentBrand.name': { $regex: args.filter.like.principal, $options: 'i' },
      });
    }
    if (args.filter.like?.client) {
      andFilters.push({ 'client.name': { $regex: args.filter.like.client, $options: 'i' } });
    }

    if (andFilters.length > 0) {
      filter.$and = andFilters;
    }

    return super.countAsync({ filter });
  }
}

class PmsGetOptions extends OmitType(GetAllArgs, ['filter']) {
  filter: {
    areaOfficeId?: string;
    like?: {
      fsrNumber?: string;
      model?: string;
      serialNumbers?: string;
      principal?: string;
      client?: string;
    };
  };
}

class PmsCountOptions extends OmitType(CountAllArgs, ['filter']) {
  filter: {
    areaOfficeId?: string;
    like?: {
      fsrNumber?: string;
      model?: string;
      serialNumbers?: string;
      principal?: string;
      client?: string;
    };
  };
}
