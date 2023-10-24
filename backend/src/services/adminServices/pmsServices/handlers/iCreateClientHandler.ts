import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { CreateClientArgs, CreateClientResult } from '../interactors/createClientInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class ICreateClientHandler
  implements IAsyncInteractorHandler<CreateClientArgs, AppResult<CreateClientResult>>
{
  executeAsync(args: CreateClientArgs): Promise<AppResult<CreateClientResult>> {
    throw new Error('Method not implemented.');
  }
}
