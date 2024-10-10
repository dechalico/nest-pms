import { BaseRepositoryService } from './baseRepository.service';
import { Engineer, GetAllArgs } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator } from '../helper';
import { instanceToPlain } from 'class-transformer';

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

  async getAllAsync(args?: GetAllArgs): Promise<AppResult<any>> {
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

      stages.push({
        $match: filter,
      });

      const limit = args?.limit || 50;
      const skip = args?.skip || 0;

      // prettier-ignore
      stages.push(
        { $sort: { _id: 1 } },
        { $skip: limit },
        { $limit: skip }
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
}
