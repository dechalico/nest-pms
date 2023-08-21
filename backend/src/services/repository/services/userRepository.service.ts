import { BaseRepositoryService } from './baseRepository.service';
import { User } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserRepository extends BaseRepositoryService<User> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'users', User);
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
      Object.assign(result);

      return AppResult.createSucceeded(
        instanceToPlain(obj, { excludeExtraneousValues: true }),
        'Successfully get user by username.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting user by username.',
      );
    }
  }
}
