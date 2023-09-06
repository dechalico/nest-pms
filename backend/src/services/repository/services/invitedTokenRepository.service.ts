import { BaseRepositoryService } from './baseRepository.service';
import { InvitedToken } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator } from '../helper';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class InvitedTokenRepository extends BaseRepositoryService<InvitedToken> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'invited_tokens', InvitedToken);
  }

  async createAsync(entity: InvitedToken): Promise<AppResult<any>> {
    try {
      const { used_by, created_by, area_office_id, ...rest } = entity;
      return super.createAsync({
        ...rest,
        created_by: objectIdCreator(created_by),
        used_by: objectIdCreator(used_by),
        area_office_id: objectIdCreator(area_office_id),
      });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating invited token.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateAsync(entity: Partial<InvitedToken>): Promise<AppResult<any>> {
    try {
      if (entity.area_office_id) {
        entity.area_office_id = objectIdCreator(entity.area_office_id);
      }
      if (entity.used_by) {
        entity.used_by = objectIdCreator(entity.used_by);
      }
      return super.updateAsync(entity);
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating invited token.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getTokenAsync(guid: string, token: string): Promise<AppResult<any>> {
    try {
      const result = await this.table.findOne<InvitedToken>({ guid, token });
      if (!result) {
        return AppResult.createFailed(
          new Error("Can't find token."),
          "Can't find token.",
          AppErrorCodes.NotFound,
        );
      }

      const obj = new this.Wrapper();
      Object.assign(obj, result);

      return AppResult.createSucceeded(
        instanceToPlain(obj, { excludeExtraneousValues: true }),
        'Successfully get token.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting token.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
