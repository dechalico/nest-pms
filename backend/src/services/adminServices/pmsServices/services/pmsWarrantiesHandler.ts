import { AppResult, AppErrorCodes } from 'src/common/app.result';
import { IPmsWarrantiesHandler } from '../handlers/iPmsWarrantiesHandler';
import { PmsWarrantiesArgs, PmsWarrantiesResult } from '../interactors/pmsWarrantiesInteractor';
import { Injectable } from '@nestjs/common';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { PmsService } from '../../../baseServices/services/pms.service';

@Injectable()
export class PmsWarrantiesHandler implements IPmsWarrantiesHandler {
  constructor(
    private readonly warrantyHistoryService: WarrantyHistoryService,
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly pmsService: PmsService,
  ) {}

  async executeAsync(args: PmsWarrantiesArgs): Promise<AppResult<PmsWarrantiesResult>> {
    try {
      const user = await this.currentUserHandler.executeAsync({});
      if (!user.succeeded || !user.result) {
        return AppResult.createFailed(new Error(user.message), user.message, user.error.code);
      }

      const pmsRes = await this.pmsService.getPmsAsync({ id: args.pmsId });
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(
          new Error('Invalid pms id.'),
          'Invalid pms id.',
          AppErrorCodes.InvalidRequest,
        );
      }
      if (pmsRes.result.areaOfficeId !== user.result.areaOfficeId) {
        return AppResult.createFailed(
          new Error('Selected pms is not in your area office.'),
          'Selected pms is not in your area office.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const warrantyHistoryRes = await this.warrantyHistoryService.pmsWarrantyHistories(args.pmsId);
      if (!warrantyHistoryRes.succeeded || !warrantyHistoryRes.result) {
        return AppResult.createFailed(
          new Error(warrantyHistoryRes.message),
          warrantyHistoryRes.message,
          warrantyHistoryRes.error.code,
        );
      }

      return AppResult.createSucceeded(
        { warranties: warrantyHistoryRes.result },
        'Warranty histories fetched.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting warranty histories.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
