import { Injectable } from '@nestjs/common';
import { ICreatePmsHandler } from '../handlers/iCreatePmsHandler';
import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { CreatePmsArgs, CreatePmsResult } from '../interactors/createPmsInteractor';
import { PmsService } from '../../../baseServices/services/pms.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';
import { WarrantyService } from '../../../baseServices/services/warranty.service';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';
import * as dayjs from 'dayjs';
import { toOrdinal } from 'number-to-words';

type Warranty = {
  name: string;
  warranty_date: Date;
  engineers_id: string[];
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

      const warrantyDates = this.createWarrantyDates(warrantyType.algorithm, args.dateInstalled);
      const warranties: Warranty[] = warrantyDates.map((w, index) => ({
        name: toOrdinal(index + 1),
        engineers_id: [],
        isDone: false,
        warranty_date: w,
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
        isLocked: false,
        pmsId: createdPms.result.id,
        warranties: createdWarranties.map((w) => w.result.id),
        warrantyTypeId: args.warrantyTypeId,
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

  private createWarrantyDates(algorithm: string, dateStart: Date): Array<Date> {
    const dates: Array<Date> = [];
    const [interval, intervalCount, duration, durationCount] = algorithm.split('|');
    const intervalInt = parseInt(intervalCount);
    const durationInt = parseInt(durationCount);

    const shorthand = {
      D: 'd',
      W: 'w',
      M: 'M',
      Y: 'y',
    };

    const endDate = dayjs(dateStart).add(durationInt, shorthand[duration]);
    let recurringDate = dayjs(dateStart).add(intervalInt, shorthand[interval]);

    while (endDate.toDate() >= recurringDate.toDate()) {
      dates.push(recurringDate.toDate());
      recurringDate = recurringDate.add(intervalInt, shorthand[interval]);
    }

    return dates;
  }
}
