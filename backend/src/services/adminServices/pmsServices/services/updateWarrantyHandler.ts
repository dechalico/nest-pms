import { Injectable } from '@nestjs/common';
import { IUpdateWarrantyTypeHandler } from '../handlers/iUpdateWarrantyHandler';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { UpdateWarrantyArgs, UpdateWarrantyResult } from '../interactors/updateWarrantyInteractor';
import { WarrantyService } from '../../../baseServices/services/warranty.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { EngineerService } from '../../../baseServices/services/engineer.service';

@Injectable()
export class UpdateWarrantyHandler implements IUpdateWarrantyTypeHandler {
  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly currentUser: ICurrentUserHandler,
    private readonly engineerService: EngineerService,
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

      const engineersRes = await this.engineerService.getAllEngineersAsync({
        includes: { areaOffice: true },
      });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating warranty.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
