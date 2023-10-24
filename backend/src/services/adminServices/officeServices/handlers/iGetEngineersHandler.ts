import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { GetEngineersArgs, GetEngineersResult } from '../interactors/getEngineersInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class IGetEngineersHandler
  implements IAsyncInteractorHandler<GetEngineersArgs, AppResult<GetEngineersResult>>
{
  executeAsync(args: GetEngineersArgs): Promise<AppResult<GetEngineersResult>> {
    throw new Error('Method not implemented.');
  }
}
