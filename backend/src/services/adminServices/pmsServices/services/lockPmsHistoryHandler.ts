import { Injectable } from '@nestjs/common';
import { ILockPmsHistoryHandler } from '../handlers/iLockPmsHistoryHandler';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
import {
  LockPmsHistoryInteractorArgs,
  LockPmsHistoryInteractorResult,
} from '../interactors/lockPmsHistoryInteractor';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { PmsService } from '../../../baseServices/services/pms.service';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';

@Injectable()
export class LockPmsHistoryHandler implements ILockPmsHistoryHandler {
  constructor(
    private readonly currentUser: ICurrentUserHandler,
    private readonly pmsService: PmsService,
    private readonly warrantyHistoryService: WarrantyHistoryService,
  ) {}

  async executeAsync(
    args: LockPmsHistoryInteractorArgs,
  ): Promise<AppResult<LockPmsHistoryInteractorResult>> {
    try {
      const currentUser = await this.currentUser.executeAsync({});
      if (!currentUser.succeeded || !currentUser.result) {
        return AppResult.createFailed(
          new Error(currentUser.message),
          currentUser.message,
          currentUser.error.code,
        );
      }
      const user = currentUser.result;

      const pmsRes = await this.pmsService.getPmsAsync({ id: args.pmsId });
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(new Error(pmsRes.message), pmsRes.message, pmsRes.error.code);
      }
      const pms = pmsRes.result;

      if (pms.areaOfficeId !== user.areaOfficeId) {
        return AppResult.createFailed(
          new Error('User is not authorized to lock warranty history.'),
          'User is not authorized to lock warranty history.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const warrantyHistoryRes = await this.warrantyHistoryService.getWarrantyHistoryById(
        args.warrantyHistoryId,
      );
      if (!warrantyHistoryRes.succeeded || !warrantyHistoryRes.result) {
        return AppResult.createFailed(
          new Error(warrantyHistoryRes.message),
          warrantyHistoryRes.message,
          warrantyHistoryRes.error.code,
        );
      }
      const warrantyHistory = warrantyHistoryRes.result;

      if (warrantyHistory.pmsId !== args.pmsId) {
        return AppResult.createFailed(
          new Error('Invalid pms id.'),
          'Invalid pms id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const updateWarrantyHistoryRes = await this.warrantyHistoryService.updateWarrantyHistory({
        id: warrantyHistory.id,
        isLock: args.isLock,
      });
      if (!updateWarrantyHistoryRes.succeeded || !updateWarrantyHistoryRes.result) {
        return AppResult.createFailed(
          new Error(updateWarrantyHistoryRes.message),
          updateWarrantyHistoryRes.message,
          updateWarrantyHistoryRes.error.code,
        );
      }

      return AppResult.createSucceeded(
        {
          id: updateWarrantyHistoryRes.result.id,
          warrantyHistoryId: updateWarrantyHistoryRes.result.id,
          isLock: updateWarrantyHistoryRes.result.isLock,
        },
        'Successfully locked pms history.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when locking pms history.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
