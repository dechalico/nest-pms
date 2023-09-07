import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IRegisterEngineerHandler } from '../handlers/IRegisterEngineerHandler';
import {
  RegisterEngineerArgs,
  RegisterEngineerResult,
} from '../interactors/registerEngineerInteractor';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { EngineerService } from '../../../baseServices/services/engineer.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterEngineerHandler implements IRegisterEngineerHandler {
  constructor(
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly engineerService: EngineerService,
  ) {}

  async executeAsync(
    args: RegisterEngineerArgs,
  ): Promise<AppResult<RegisterEngineerResult>> {
    try {
      const currentUserUres = await this.currentUserHandler.executeAsync({});
      if (!currentUserUres.Succeeded || !currentUserUres.Result) {
        return AppResult.createFailed(
          new Error(currentUserUres.Message),
          currentUserUres.Message,
          currentUserUres.Error.code,
        );
      }
      const currentUser = currentUserUres.Result;

      const registerRes = await this.engineerService.createEngineerAsync({
        areaOfficeId: currentUser.areaOfficeId,
        createdBy: currentUser.id,
        firstName: args.firstName,
        lastName: args.lastName,
        middleName: args.middleName,
      });
      if (!registerRes.Succeeded || !registerRes.Result) {
        return AppResult.createFailed(
          new Error(registerRes.Message),
          registerRes.Message,
          registerRes.Error.code,
        );
      }
      const registered = registerRes.Result;

      return AppResult.createSucceeded(
        {
          areaOfficeId: registered.areaOfficeId,
          firstName: registered.firstName,
          id: registered.id,
          lastName: registered.lastName,
          middleName: registered.middleName,
        },
        'Engineer successfully registered.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when registering engineer.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
