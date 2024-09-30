import { Injectable } from '@nestjs/common';
import { ICreatePmsHandler } from '../handlers/iCreatePmsHandler';
import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { CreatePmsArgs, CreatePmsResult } from '../interactors/createPmsInteractor';
import { PmsService } from '../../../baseServices/services/pms.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';
import { WarrantyService } from '../../../baseServices/services/warranty.service';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';
import { toOrdinal } from 'number-to-words';
import { warrantyDatesGenerator } from '../../../../utils/warrantyHelper';

type Warranty = {
  name: string;
  warrantyDate: Date;
  engineers: string[];
  isDone: boolean;
};

@Injectable()
export class CreatePmsHandler implements ICreatePmsHandler {
  constructor(
    private readonly pmsService: PmsService,
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly warrantyTypeService: WarrantyTypeService,
    private readonly warrantyService: WarrantyService,
    private readonly warrantyHistoryService: WarrantyHistoryService,
  ) {}

  async executeAsync(args: CreatePmsArgs): Promise<AppResult<CreatePmsResult>> {
    try {
      const currentUserRes = await this.currentUserHandler.executeAsync({});
      if (!currentUserRes.succeeded || !currentUserRes.result) {
        return AppResult.createFailed(
          new Error(currentUserRes.message),
          currentUserRes.message,
          currentUserRes.error.code,
        );
      }
      const user = currentUserRes.result;

      const warrantyTypeRes = await this.warrantyTypeService.getWarrantyType(args.warrantyTypeId);
      if (!warrantyTypeRes.succeeded || !warrantyTypeRes.result) {
        return AppResult.createFailed(
          new Error('Invalid selected warranty type.'),
          'Invalid selected warranty type.',
          AppErrorCodes.InvalidRequest,
        );
      }
      const warrantyType = warrantyTypeRes.result;

      const warrantyDates = warrantyDatesGenerator(warrantyType.algorithm, args.dateInstalled);
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

      const createdPms = await this.pmsService.createPmsAync({
        areaOfficeId: user.areaOfficeId,
        clientId: args.clientId,
        dateInstalled: args.dateInstalled,
        engineersId: args.engineersId,
        equipmentBrandId: args.equipmentBrandId,
        fsrNumber: args.fsrNumber,
        model: args.model,
        remarks: args.remarks,
        serialNumbers: args.serialNumbers,
        status: 'active',
      });
      if (!createdPms.succeeded || !createdPms.result) {
        return AppResult.createFailed(
          new Error(createdPms.message),
          createdPms.message,
          createdPms.error.code,
        );
      }

      const createWarrantyHistory = await this.warrantyHistoryService.createWarrantyHistory({
        isLock: false,
        pmsId: createdPms.result.id,
        warranties: createdWarranties.map((w) => w.result.id),
        warrantyTypeId: args.warrantyTypeId,
        dateCreated: new Date(),
      });
      if (!createWarrantyHistory.succeeded || !createWarrantyHistory.result) {
        return AppResult.createFailed(
          new Error(createWarrantyHistory.message),
          createWarrantyHistory.message,
          createWarrantyHistory.error.code,
        );
      }

      return AppResult.createSucceeded(createdPms.result, 'PMS successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured in CreatePmsHandler.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
