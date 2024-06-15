import { AppErrorCodes, AppResult } from 'src/common/app.result';
import { IGetAllPmsHandler } from '../handlers/iGetAllPmsHandler';
import { GetAllPmsArgs, GetAllPmsResult } from '../interactors/getAllPmsInteractor';
import { Injectable } from '@nestjs/common';
import { PmsService } from '../../../baseServices/services/pms.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';

@Injectable()
export class GetAllPmsHandler implements IGetAllPmsHandler {
  constructor(
    private readonly pmsService: PmsService,
    private readonly currentUser: ICurrentUserHandler,
  ) {}

  async executeAsync(args: GetAllPmsArgs): Promise<AppResult<GetAllPmsResult>> {
    try {
      const currentUserRes = await this.currentUser.executeAsync({});
      if (!currentUserRes.succeeded || !currentUserRes.result) {
        return AppResult.createFailed(
          new Error(currentUserRes.message),
          currentUserRes.message,
          currentUserRes.error.code,
        );
      }
      const user = currentUserRes.result;

      const pmsRes = await this.pmsService.getAllPmsAsync({ areaOfficeId: user.areaOfficeId });
      if (!pmsRes.succeeded || !pmsRes.result) {
        return AppResult.createFailed(new Error(pmsRes.message), pmsRes.message, pmsRes.error.code);
      }

      return AppResult.createSucceeded({ pms: pmsRes.result }, 'Successfully get all pms.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured in GetAllPmsHandler.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
