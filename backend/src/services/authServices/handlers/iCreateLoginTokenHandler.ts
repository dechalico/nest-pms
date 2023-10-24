import { IAsyncInteractorHandler } from '../../../common/asyncInteractorHandler';
import {
  CreateLoginTokenArgs,
  CreateLoginTokenResult,
} from '../interactors/createLoginTokenInteractor';
import { AppResult } from '../../../common/app.result';

export abstract class ICreateLoginTokenHandler
  implements IAsyncInteractorHandler<CreateLoginTokenArgs, AppResult<CreateLoginTokenResult>>
{
  abstract executeAsync(args: CreateLoginTokenArgs): Promise<AppResult<CreateLoginTokenResult>>;
}
