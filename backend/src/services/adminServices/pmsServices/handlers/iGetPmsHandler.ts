import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { AppResult } from '../../../../common/app.result';
import { GetPmsArgs, GetPmsResult } from '../interactors/getPmsInteractor';

export abstract class IGetPmsHandler
  implements IAsyncInteractorHandler<GetPmsArgs, AppResult<GetPmsResult>>
{
  executeAsync(args: GetPmsArgs): Promise<AppResult<GetPmsResult>> {
    throw new Error('Method not implemented.');
  }
}
