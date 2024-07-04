import { Injectable } from '@nestjs/common';
import { ICreatePmsHandler } from '../handlers/iCreatePmsHandler';
import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { CreatePmsArgs, CreatePmsResult } from '../interactors/createPmsInteractor';
import { PmsService } from '../../../baseServices/services/pms.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';
import { WarrantyService } from '../../../baseServices/services/warranty.service';
import * as dayjs from 'dayjs';

@Injectable()
export class CreatePmsHandler implements ICreatePmsHandler {
  constructor(
    private readonly pmsService: PmsService,
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly warrantyTypeService: WarrantyTypeService,
    private readonly warrantyService: WarrantyService,
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

      const createRes = await this.pmsService.createPmsAync({
        areaOfficeId: user.areaOfficeId,
        clientId: args.clientId,
        dateInstalled: new Date(),
        engineersId: args.engineersId,
        equipmentBrandId: args.equipmentBrandId,
        fsrNumber: args.fsrNumber,
        model: args.model,
        remarks: args.remarks,
        serialNumbers: args.serialNumbers,
        status: 'active',
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }

      return AppResult.createSucceeded(createRes.result, 'PMS successfully created.');
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
    return dates;
  }
}
