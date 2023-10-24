import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { CreateOfficeArgs, CreateOfficeResult } from '../interactors/createOfficeInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class ICreateOfficeHandler
  implements IAsyncInteractorHandler<CreateOfficeArgs, AppResult<CreateOfficeResult>>
{
  abstract executeAsync(args: CreateOfficeArgs): Promise<AppResult<CreateOfficeResult>>;
}
