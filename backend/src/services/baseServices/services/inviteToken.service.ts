import { Injectable } from '@nestjs/common';
import {
  CreateInvitedToken,
  InvitedTokenSchema,
  UpdateInvitedToken,
} from '../schemas/invitedToken.schema';
import { InvitedTokenRepository } from '../../repository/services/invitedTokenRepository.service';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';
import { UserRepository } from '../../repository/services/userRepository.service';
import { AppErrorCodes, AppResult } from '../../../common/app.result';

@Injectable()
export class InviteTokenService {
  constructor(
    private readonly inviteTokenRepo: InvitedTokenRepository,
    private readonly areaOfficeRepo: AreaOfficeRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createInviteTokenAsync(args: CreateInvitedToken): Promise<AppResult<InvitedTokenSchema>> {
    try {
      // check area office if existed
      const chkAreaRes = await this.areaOfficeRepo.getByIdAsync(args.areaOfficeId);
      if (!chkAreaRes.succeeded || !chkAreaRes.result) {
        return AppResult.createFailed(
          new Error('Invalid area office id.'),
          'Invalid area office id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      // check created by user
      const chkCreatedRes = await this.userRepo.getByIdAsync(args.createdBy);
      if (!chkCreatedRes.succeeded || !chkCreatedRes.result) {
        return AppResult.createFailed(
          new Error('Invalid created by id.'),
          'Invalid created by id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const now = new Date();
      const createRes = await this.inviteTokenRepo.createAsync({
        date_created: now,
        area_office_id: args.areaOfficeId,
        date_updated: undefined,
        created_by: args.createdBy,
        date_used: undefined,
        is_used: args.isUsed,
        used_by: args.usedBy,
        _id: undefined,
        guid: args.guid,
        token: args.token,
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(new Error(createRes.message), createRes.message);
      }

      const objResult: InvitedTokenSchema = createRes.result;
      return AppResult.createSucceeded(objResult, 'Invited token successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating invite token.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateInviteTokenAsync(args: UpdateInvitedToken): Promise<AppResult<InvitedTokenSchema>> {
    try {
      // check area office if existed
      if (args.areaOfficeId) {
        const chkAreaRes = await this.areaOfficeRepo.getByIdAsync(args.areaOfficeId);
        if (!chkAreaRes.succeeded || !chkAreaRes.result) {
          return AppResult.createFailed(
            new Error('Invalid area office id.'),
            'Invalid area office id.',
            AppErrorCodes.InvalidRequest,
          );
        }
      }

      // check created by user
      if (args.createdBy) {
        const chkCreatedRes = await this.userRepo.getByIdAsync(args.createdBy);
        if (!chkCreatedRes.succeeded || !chkCreatedRes.result) {
          return AppResult.createFailed(
            new Error('Invalid created by id.'),
            'Invalid created by id.',
            AppErrorCodes.InvalidRequest,
          );
        }
      }

      const updatedRes = await this.inviteTokenRepo.updateAsync({
        _id: args.id,
        created_by: args.createdBy,
        area_office_id: args.areaOfficeId,
        date_updated: new Date(),
        date_used: args.dateUsed,
        is_used: args.isUsed,
        used_by: args.usedBy,
        guid: args.guid,
        token: args.token,
      });
      if (!updatedRes.succeeded || !updatedRes.result) {
        return AppResult.createFailed(
          new Error(updatedRes.message),
          updatedRes.message,
          updatedRes.error.code,
        );
      }

      const objResult: InvitedTokenSchema = updatedRes.result;
      return AppResult.createSucceeded(objResult, 'Invited token successfully updated.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating invited token',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getTokenAsync(guid: string, token: string): Promise<AppResult<InvitedTokenSchema>> {
    try {
      const getRes = await this.inviteTokenRepo.getTokenAsync(guid, token);
      if (!getRes.succeeded || !getRes.result) {
        return AppResult.createFailed(new Error(getRes.message), getRes.message, getRes.error.code);
      }

      const obj: InvitedTokenSchema = getRes.result;
      return AppResult.createSucceeded(obj, 'Successfully get token.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting the token.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
