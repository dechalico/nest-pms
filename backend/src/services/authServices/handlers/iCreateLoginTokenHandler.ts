import { IAsyncInteractorHandler } from '../../../common/asyncInteractorHandler';
import {
  CreateLoginTokenArgs,
  CreateLoginTokenResult,
} from '../interactors/createLoginTokenInteractor';
import { AppResult } from '../../../common/app.result';

export class ICreateLoginTokenHandler
  implements
    IAsyncInteractorHandler<
      CreateLoginTokenArgs,
      AppResult<CreateLoginTokenResult>
    >
{
  executeAsync(
    args: CreateLoginTokenArgs,
  ): Promise<AppResult<CreateLoginTokenResult>> {
    throw new Error('Method not implemented.');
  }
}
