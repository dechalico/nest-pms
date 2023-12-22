import { BaseRepositoryService } from './baseRepository.service';
import { GetAllArgs, User } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { instanceToPlain } from 'class-transformer';
import { objectIdCreator } from '../helper';

@Injectable()
export class UserRepository extends BaseRepositoryService<User> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'users', User);
  }

  async createAsync(entity: User): Promise<AppResult<any>> {
    try {
      const { area_office_id, ...rest } = entity;
      return super.createAsync({
        ...rest,
        area_office_id: objectIdCreator(area_office_id),
      });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating user.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getByUsernameAsync(username: string): Promise<AppResult<any>> {
    try {
      const result = await this.table.findOne<User>({ username: username });
      if (!result) {
        return AppResult.createFailed(
          new Error('Unable to find user by username.'),
          'Unable to find user by username.',
          AppErrorCodes.NotFound,
        );
      }

      const obj = new this.Wrapper();
      Object.assign(obj, result);

      return AppResult.createSucceeded(
        instanceToPlain(obj, { excludeExtraneousValues: true }),
        'Successfully get user by username.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting user by username.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getUsersWithOffice(): Promise<AppResult<any>> {
    try {
      const cursor = this.table.aggregate<User>([
        {
          $lookup: {
            from: 'area_offices',
            localField: 'area_office_id',
            foreignField: '_id',
            as: 'result',
          },
        },
        {
          $project: {
            email: 1,
            username: 1,
            firstName: 1,
            lastName: 1,
            area_office: {
              _id: { $first: '$result._id' },
              city: { $first: '$result.city' },
              name: { $first: '$result.name' },
            },
          },
        },
      ]);
      const result: User[] = [];
      for await (const doc of cursor) {
        const obj = new this.Wrapper();
        Object.assign(obj, doc);
        result.push(obj);
      }

      return AppResult.createSucceeded(
        instanceToPlain(result, { excludeExtraneousValues: true }),
        'Successfully get all users',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all users',
        AppErrorCodes.InternalError,
      );
    }
  }
}
