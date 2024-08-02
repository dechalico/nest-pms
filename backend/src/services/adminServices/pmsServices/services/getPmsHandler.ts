import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { Injectable } from '@nestjs/common';
import { IGetPmsHandler } from '../handlers/iGetPmsHandler';
import { GetPmsArgs, GetPmsResult } from '../interactors/getPmsInteractor';
import { PmsService } from '../../../baseServices/services/pms.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';

@Injectable()
export class GetPmsHandler implements IGetPmsHandler {
  constructor(
    private readonly pmsService: PmsService,
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly warrantyHistoryService: WarrantyHistoryService,
    private readonly warrantyTypeService: WarrantyTypeService,
  ) {}

  async executeAsync(args: GetPmsArgs): Promise<AppResult<GetPmsResult>> {
    try {
      const currentUserRes = await this.currentUserHandler.executeAsync({});
      if (!currentUserRes.succeeded || !currentUserRes.result) {
        return AppResult.createFailed(
          new Error(currentUserRes.message),
          currentUserRes.message,
          currentUserRes.error.code,
        );
      }
      const currentUser = currentUserRes.result;

      const pmsRes = await this.pmsService.getPmsAsync({ id: args.id });
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(new Error(pmsRes.message), pmsRes.message, pmsRes.error.code);
      }
      const pms = pmsRes.result;

      if (pms.areaOfficeId !== currentUser.areaOfficeId) {
        return AppResult.createFailed(
          new Error('You are not allowed to get this pms.'),
          'You are not allowed to get this pms.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const warrantyHistoriesRes = await this.warrantyHistoryService.getWarrantyHitories({
        pmsId: pms.id,
      });
      if (!warrantyHistoriesRes.succeeded || !warrantyHistoriesRes.result) {
        return AppResult.createFailed(
          new Error(warrantyHistoriesRes.message),
          warrantyHistoriesRes.message,
          warrantyHistoriesRes.error.code,
        );
      }
      if (warrantyHistoriesRes.result.length === 0) {
        return AppResult.createFailed(
          new Error('No warranty history found.'),
          'No warranty history found.',
          AppErrorCodes.NotFound,
        );
      }
      const warrantyHistory = warrantyHistoriesRes.result[0];

      const warrantyTypeRes = await this.warrantyTypeService.getWarrantyType(
        warrantyHistory.warrantyTypeId,
      );
      if (!warrantyTypeRes.succeeded || !warrantyTypeRes.result) {
        return AppResult.createFailed(
          new Error(warrantyTypeRes.message),
          warrantyTypeRes.message,
          warrantyTypeRes.error.code,
        );
      }
      const warrantyType = warrantyTypeRes.result;

      const result = {
        pms: {
          ...pms,
          warranty: warrantyType.name,
        },
      };

      return AppResult.createSucceeded(result, 'Successfully get pms.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting pms',
        AppErrorCodes.InternalError,
      );
    }
  }
}
