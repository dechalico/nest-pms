import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { Injectable } from '@nestjs/common';
import { EngineerService } from '../../../baseServices/services/engineer.service';
import { IUpdateEngineerHandler } from '../handlers/iUpdateEngineerHandler';
import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { UpdateEngineerArgs, UpdateEngineerResult } from '../interactors/updateEngineerInteractor';

@Injectable()
export class UpdateEngineerHandler implements IUpdateEngineerHandler {
  constructor(
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly engineerService: EngineerService,
  ) {}

  async executeAsync(args: UpdateEngineerArgs): Promise<AppResult<UpdateEngineerResult>> {
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

      const engineerRes = await this.engineerService.getEngineerAsync(args.id);
      if (!engineerRes.succeeded || !engineerRes.result) {
        return AppResult.createFailed(
          new Error(engineerRes.message),
          engineerRes.message,
          AppErrorCodes.InvalidRequest,
        );
      }
      const engineer = engineerRes.result;

      // user can only update engineer with the same area office id
      if (user.areaOfficeId !== engineer.areaOfficeId) {
        return AppResult.createFailed(
          new Error('Invalid request.'),
          'Invalid request',
          AppErrorCodes.InvalidRequest,
        );
      }

      const updateRes = await this.engineerService.updateEngineerAsync(args);
      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(
          new Error(updateRes.message),
          updateRes.message,
          updateRes.error.code,
        );
      }
      const updated = updateRes.result;
      return AppResult.createSucceeded(
        {
          areaOfficeId: updated.areaOfficeId,
          firstName: updated.firstName,
          id: updated.id,
          lastName: updated.lastName,
          middleName: updated.middleName,
        },
        'Engineer successfully updated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
