import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  UpdateEngineerArgs,
  UpdateEngineerResult,
} from '../interactors/updateEngineerInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class IUpdateEngineerHandler
  implements
    IAsyncInteractorHandler<
      UpdateEngineerArgs,
      AppResult<UpdateEngineerResult>
    >
{
  executeAsync(
    args: UpdateEngineerArgs,
  ): Promise<AppResult<UpdateEngineerResult>> {
    throw new Error('Method not implemented.');
  }
}
