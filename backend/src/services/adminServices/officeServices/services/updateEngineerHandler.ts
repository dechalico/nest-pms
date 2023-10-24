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
      if (!currentUserRes.Succeeded || !currentUserRes.Result) {
        return AppResult.createFailed(
          new Error(currentUserRes.Message),
          currentUserRes.Message,
          currentUserRes.Error.code,
        );
      }
      const user = currentUserRes.Result;

      const engineerRes = await this.engineerService.getEngineerAsync(args.id);
      if (!engineerRes.Succeeded || !engineerRes.Result) {
        return AppResult.createFailed(
          new Error(engineerRes.Message),
          engineerRes.Message,
          AppErrorCodes.InvalidRequest,
        );
      }
      const engineer = engineerRes.Result;

      // user can only update engineer with the same area office id
      if (user.areaOfficeId !== engineer.areaOfficeId) {
        return AppResult.createFailed(
          new Error('Invalid request.'),
          'Invalid request',
          AppErrorCodes.InvalidRequest,
        );
      }

      const updateRes = await this.engineerService.updateEngineerAsync(args);
      if (!updateRes.Succeeded || !updateRes.Result) {
        return AppResult.createFailed(
          new Error(updateRes.Message),
          updateRes.Message,
          updateRes.Error.code,
        );
      }
      const updated = updateRes.Result;
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
