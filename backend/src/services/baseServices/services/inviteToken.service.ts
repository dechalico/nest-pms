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

  async createInviteTokenAsync(
    args: CreateInvitedToken,
  ): Promise<AppResult<InvitedTokenSchema>> {
    try {
      // check area office if existed
      const chkAreaRes = await this.areaOfficeRepo.getByIdAsync(
        args.areaOfficeId,
      );
      if (!chkAreaRes.Succeeded || !chkAreaRes.Result) {
        return AppResult.createFailed(
          new Error('Invalid area office id.'),
          'Invalid area office id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      // check created by user
      const chkCreatedRes = await this.userRepo.getByIdAsync(args.createdBy);
      if (!chkCreatedRes.Succeeded || !chkCreatedRes.Result) {
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
      if (!createRes.Succeeded || !createRes.Result) {
        return AppResult.createFailed(
          new Error(createRes.Message),
          createRes.Message,
        );
      }

      const objResult: InvitedTokenSchema = createRes.Result;
      return AppResult.createSucceeded(
        objResult,
        'Invited token successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating invite token.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateInviteTokenAsync(
    args: UpdateInvitedToken,
  ): Promise<AppResult<InvitedTokenSchema>> {
    try {
      // check area office if existed
      if (args.areaOfficeId) {
        const chkAreaRes = await this.areaOfficeRepo.getByIdAsync(
          args.areaOfficeId,
        );
        if (!chkAreaRes.Succeeded || !chkAreaRes.Result) {
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
        if (!chkCreatedRes.Succeeded || !chkCreatedRes.Result) {
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
      if (!updatedRes.Succeeded || !updatedRes.Result) {
        return AppResult.createFailed(
          new Error(updatedRes.Message),
          updatedRes.Message,
          updatedRes.Error.code,
        );
      }

      const objResult: InvitedTokenSchema = updatedRes.Result;
      return AppResult.createSucceeded(
        objResult,
        'Invited token successfully updated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating invited token',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getTokenAsync(
    guid: string,
    token: string,
  ): Promise<AppResult<InvitedTokenSchema>> {
    try {
      const getRes = await this.inviteTokenRepo.getTokenAsync(guid, token);
      if (!getRes.Succeeded || !getRes.Result) {
        return AppResult.createFailed(
          new Error(getRes.Message),
          getRes.Message,
          getRes.Error.code,
        );
      }

      const obj: InvitedTokenSchema = getRes.Result;
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
