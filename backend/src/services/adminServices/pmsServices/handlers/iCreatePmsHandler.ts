import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { CreatePmsArgs, CreatePmsResult } from '../interactors/createPmsInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class ICreatePmsHandler
  implements IAsyncInteractorHandler<CreatePmsArgs, AppResult<CreatePmsResult>>
{
  executeAsync(args: CreatePmsArgs): Promise<AppResult<CreatePmsResult>> {
    throw new Error('Method not implemented.');
  }
}
