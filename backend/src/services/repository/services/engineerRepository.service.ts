import { BaseRepositoryService } from './baseRepository.service';
import { CountAllArgs, Engineer, GetAllArgs } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator, DEFAULT_LIMIT, DEFAULT_SKIP } from '../helper';
import { instanceToPlain } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class EngineerRepository extends BaseRepositoryService<Engineer> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'engineers', Engineer);
  }

  async createAsync(entity: Engineer): Promise<AppResult<any>> {
    try {
      entity.area_office_id = objectIdCreator(entity.area_office_id);
      entity.created_by = objectIdCreator(entity.created_by);
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

  async getAllAsync(args: EngineerGetOptions): Promise<AppResult<any>> {
    try {
      const stages = [];

      const filter = {};

      if (args.filter?._id) {
        filter['_id'] = {
          $in:
            args.filter?._id instanceof Array
              ? args.filter._id.map((i) => objectIdCreator(i))
              : [objectIdCreator(args.filter._id)],
        };
      }

      if (args.filter?.like?.name) {
        filter['$or'] = [
          { firstName: { $regex: args.filter.like.name, $options: 'i' } },
          { lastName: { $regex: args.filter.like.name, $options: 'i' } },
          { middleName: { $regex: args.filter.like.name, $options: 'i' } },
        ];
      }

      stages.push({
        $match: filter,
      });

      // prettier-ignore
      stages.push(
        { $sort: { _id: 1 } },
        { $skip: args?.skip || DEFAULT_SKIP },
        { $limit: args?.limit || DEFAULT_LIMIT },
      );

      if (args.include?.area_office) {
        stages.push({
          $lookup: {
            from: 'area_offices',
            localField: 'area_office_id',
            foreignField: '_id',
            as: 'result',
          },
        });

        stages.push({
          $project: {
            _id: 1,
            area_office_id: 1,
            date_created: 1,
            date_updated: 1,
            firstName: 1,
            lastName: 1,
            middleName: 1,
            created_by: 1,
            area_office: {
              _id: { $first: '$result._id' },
              city: { $first: '$result.city' },
              name: { $first: '$result.name' },
            },
          },
        });
      }

      const cursor = this.table.aggregate<Engineer>(stages);
      const result: Engineer[] = [];
      for await (const doc of cursor) {
        const obj = new this.Wrapper();
        Object.assign(obj, doc);
        result.push(obj);
      }

      return AppResult.createSucceeded(
        instanceToPlain(result, { excludeExtraneousValues: true }),
        'Successfully get all engineers',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all engineers',
        AppErrorCodes.InternalError,
      );
    }
  }

  async countAsync(args: EngineerCountOptions): Promise<AppResult<any>> {
    try {
      const filter = {};

      if (args.filter?._id) {
        filter['_id'] = {
          $in:
            args.filter?._id instanceof Array
              ? args.filter._id.map((i) => objectIdCreator(i))
              : [objectIdCreator(args.filter._id)],
        };
      }

      if (args.filter?.like?.name) {
        filter['$or'] = [
          { firstName: { $regex: args.filter.like.name, $options: 'i' } },
          { lastName: { $regex: args.filter.like.name, $options: 'i' } },
          { middleName: { $regex: args.filter.like.name, $options: 'i' } },
        ];
      }

      const count = await this.table.countDocuments(filter);
      return AppResult.createSucceeded(count, 'Successfully get all engineers count');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all engineers count',
        AppErrorCodes.InternalError,
      );
    }
  }
}

class EngineerGetOptions extends OmitType(GetAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
    _id?: string | string[];
  };
}

class EngineerCountOptions extends OmitType(CountAllArgs, ['filter']) {
  filter?: {
    like?: {
      name?: string;
    };
    _id?: string | string[];
  };
}
