import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { IGetOfficesHandler } from '../handlers/IGetOfficesHandler';
import {
  GetOfficesArgs,
  GetOfficesResult,
  Office,
} from '../interactors/getOfficesInteractor';
import { AreaOfficeService } from '../../../baseServices/services/areaOffice.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetOfficesHandler implements IGetOfficesHandler {
  constructor(private readonly areaOfficeService: AreaOfficeService) {}

  async executeAsync(
    args: GetOfficesArgs,
  ): Promise<AppResult<GetOfficesResult>> {
    try {
      const getRes = await this.areaOfficeService.getAllAreaOffices();
      if (!getRes.Succeeded || !getRes.Result) {
        return AppResult.createFailed(
          new Error(getRes.Message),
          getRes.Message,
          getRes.Error.code,
        );
      }

      const offices: Array<Office> = getRes.Result;
      return AppResult.createSucceeded(
        {
          offices,
        },
        'Successfully get offices',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting offices',
        AppErrorCodes.InternalError,
      );
    }
  }
}
