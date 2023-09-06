import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { ICreateOfficeHandler } from '../handlers/iCreateOfficeHandler';
import {
  CreateOfficeArgs,
  CreateOfficeResult,
} from '../interactors/createOfficeInteractor';
import { Injectable } from '@nestjs/common';
import { AreaOfficeService } from '../../../baseServices/services/areaOffice.service';

@Injectable()
export class CreateOfficeHandler implements ICreateOfficeHandler {
  constructor(private readonly areaOfficeService: AreaOfficeService) {}

  async executeAsync(
    args: CreateOfficeArgs,
  ): Promise<AppResult<CreateOfficeResult>> {
    try {
      const createdRes = await this.areaOfficeService.createAreaOfficeAsync(
        args,
      );

      if (!createdRes.Succeeded || !createdRes.Result) {
        return AppResult.createFailed(
          new Error(createdRes.Message),
          createdRes.Message,
          createdRes.Error.code,
        );
      }
      const created = createdRes.Result;
      return AppResult.createSucceeded(
        {
          city: created.city,
          dateCreated: created.dateCreated,
          name: created.name,
        },
        'Successfully create area office.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating office.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
