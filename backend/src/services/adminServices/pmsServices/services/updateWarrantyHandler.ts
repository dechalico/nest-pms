import { Injectable } from '@nestjs/common';
import { IUpdateWarrantyHandler } from '../handlers/iUpdateWarrantyHandler';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { UpdateWarrantyArgs, UpdateWarrantyResult } from '../interactors/updateWarrantyInteractor';
import { WarrantyService } from '../../../baseServices/services/warranty.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { WarrantyHistoryService } from '../../../baseServices/services/warrantyHistory.service';
import { PmsService } from '../../../baseServices/services/pms.service';
import { WarrantyTypeService } from '../../../baseServices/services/warrantyType.service';
import { Warranty } from '../../../baseServices/schemas/warranty.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class UpdateWarrantyHandler implements IUpdateWarrantyHandler {
  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly currentUser: ICurrentUserHandler,
    private readonly warrantyHistoryService: WarrantyHistoryService,
    private readonly pmsService: PmsService,
    private readonly warrantyTypeService: WarrantyTypeService,
  ) {}

  async executeAsync(args: UpdateWarrantyArgs): Promise<AppResult<UpdateWarrantyResult>> {
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

      const pmsRes = await this.pmsService.getPmsAsync({ id: warrantyHistory.pmsId });
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(new Error(pmsRes.message), pmsRes.message, pmsRes.error.code);
      }
      const pms = pmsRes.result;

      if (pms.areaOfficeId !== user.areaOfficeId) {
        return AppResult.createFailed(
          new Error('User is not authorized to update warranty.'),
          'User is not authorized to update warranty.',
          AppErrorCodes.InvalidRequest,
        );
      }

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

      const newWarrantyDates = this.createWarrantyDates(warrantyType.algorithm, args.warrantyDate);

      const warrantiesRes = await this.warrantyService.getAllWarrantiesAsync({
        id: warrantyHistory.warranties.map((w) => (typeof w === 'string' ? w : w.id)),
      });
      if (!warrantiesRes.succeeded || !warrantiesRes.result) {
        return AppResult.createFailed(
          new Error(warrantiesRes.message),
          warrantiesRes.message,
          warrantiesRes.error.code,
        );
      }
      const warranties = warrantiesRes.result.sort((a, b) => a.id.localeCompare(b.id));

      const warrantiesToUpdate: Warranty[] = [];
      let foundBeginToUpdate = false;

      for (const warranty of warranties) {
        if (warranty.id === args.id) {
          foundBeginToUpdate = true;
        }
        if (foundBeginToUpdate) {
          warrantiesToUpdate.push(warranty);
        }
      }

      const [firstWarranty, ...rest] = warrantiesToUpdate;

      firstWarranty.isDone = args.isDone;
      firstWarranty.engineers = args.engineers;
      firstWarranty.warrantyDate = args.warrantyDate;

      for (let i = 0; i < rest.length; i++) {
        const warranty = rest[i];

        warranty.warrantyDate = newWarrantyDates[i];
      }

      // add back first warranty to update
      rest.push(firstWarranty);

      const updateWarranties = rest.map((w) =>
        this.warrantyService.updateWarrantyAsync({
          id: w.id,
          isDone: w.isDone,
          engineers: w.engineers,
          warrantyDate: w.warrantyDate,
        }),
      );

      const updatedWarranties = await Promise.all(updateWarranties);

      const haveErrors = updatedWarranties.some((value) => !value.succeeded || !value.result);
      if (haveErrors) {
        return AppResult.createFailed(
          new Error('Some warranties failed to update.'),
          'Some warranties failed to update.',
          AppErrorCodes.InternalError,
        );
      }

      return AppResult.createSucceeded(
        {
          engineers: args.engineers,
          isDone: args.isDone,
          warrantyDate: args.warrantyDate,
          id: args.id,
        },
        'Successfully updated warranty.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating warranty.',
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
