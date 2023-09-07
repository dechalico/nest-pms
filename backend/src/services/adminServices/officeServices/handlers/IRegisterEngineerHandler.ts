import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  RegisterEngineerArgs,
  RegisterEngineerResult,
} from '../interactors/registerEngineerInteractor';
import { AppResult } from '../../../../common/app.result';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IRegisterEngineerHandler
  implements
    IAsyncInteractorHandler<
      RegisterEngineerArgs,
      AppResult<RegisterEngineerResult>
    >
{
  constructor() {}
  executeAsync(
    args: RegisterEngineerArgs,
  ): Promise<AppResult<RegisterEngineerResult>> {
    throw new Error('Method not implemented.');
  }
}
