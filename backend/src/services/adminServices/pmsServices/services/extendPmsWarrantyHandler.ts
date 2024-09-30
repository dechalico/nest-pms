import { Injectable } from '@nestjs/common';
import { IExtendPmsWarrantyHandler } from '../handlers/iExtendPmsWarrantyHandler';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
import {
  ExtendPmsWarrantyArgs,
  ExtendPmsWarrantyResult,
} from '../interactors/extendPmsWarrantyInteractor';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { PmsService } from '../../../baseServices/services/pms.service';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';
import { warrantyDatesGenerator } from '../../../../utils/warrantyHelper';
import { WarrantyService } from '../../../baseServices/services/warranty.service';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';
import { toOrdinal } from 'number-to-words';

type Warranty = {
  name: string;
  warrantyDate: Date;
  engineers: string[];
  isDone: boolean;
};

@Injectable()
export class ExtendPmsWarrantyHandler implements IExtendPmsWarrantyHandler {
  constructor(
    private readonly currentUser: ICurrentUserHandler,
    private readonly pmsService: PmsService,
    private readonly warrantyTypeService: WarrantyTypeService,
    private readonly warrantyService: WarrantyService,
    private readonly warrantyHistoryService: WarrantyHistoryService,
  ) {}

  async executeAsync(args: ExtendPmsWarrantyArgs): Promise<AppResult<ExtendPmsWarrantyResult>> {
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

      const pmsRes = await this.pmsService.getPmsAsync({ id: args.id });
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(new Error(pmsRes.message), pmsRes.message, pmsRes.error.code);
      }
      const pms = pmsRes.result;

      if (pms.areaOfficeId !== user.areaOfficeId) {
        return AppResult.createFailed(
          new Error('User is not authorized to extend warranty.'),
          'User is not authorized to extend warranty.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const warrantyTypeRes = await this.warrantyTypeService.getWarrantyType(args.warrantyTypeId);
      if (!warrantyTypeRes.succeeded || !warrantyTypeRes.result) {
        return AppResult.createFailed(
          new Error('Invalid selected warranty type.'),
          'Invalid selected warranty type.',
          AppErrorCodes.InvalidRequest,
        );
      }
      const warrantyType = warrantyTypeRes.result;

      const warrantyDates = warrantyDatesGenerator(warrantyType.algorithm, args.dateExtendedStart);
      const warranties: Warranty[] = warrantyDates.map((w, index) => ({
        name: toOrdinal(index + 1),
        engineers: [],
        isDone: false,
        warrantyDate: w,
      }));

      const createWarranties = warranties.map((w) => this.warrantyService.createWarrantyAsync(w));
      const createdWarranties = await Promise.all(createWarranties);
      const haveErrors = createdWarranties.some((value) => !value.succeeded || !value.result);
      if (haveErrors) {
        throw new Error('An error occured when creating warranry');
      }

      const createWarrantyHistory = await this.warrantyHistoryService.createWarrantyHistory({
        isLock: false,
        pmsId: pms.id,
        warranties: createdWarranties.map((w) => w.result.id),
        warrantyTypeId: warrantyType.id,
        dateCreated: new Date(),
      });
      if (!createWarrantyHistory.succeeded || !createWarrantyHistory.result) {
        return AppResult.createFailed(
          new Error(createWarrantyHistory.message),
          createWarrantyHistory.message,
          createWarrantyHistory.error.code,
        );
      }

      return AppResult.createSucceeded(
        {
          id: pms.id,
          warrantyHistoryId: createWarrantyHistory.result.id,
          warrantyTypeId: warrantyType.id,
        },
        'Warranty successfully extended.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when extending warranty.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
