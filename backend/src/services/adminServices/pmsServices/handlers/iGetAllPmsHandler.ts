import { AppResult } from '../../../../common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { GetAllPmsArgs, GetAllPmsResult } from '../interactors/getAllPmsInteractor';

export abstract class IGetAllPmsHandler
  implements IAsyncInteractorHandler<GetAllPmsArgs, AppResult<GetAllPmsResult>>
{
  executeAsync(args: GetAllPmsArgs): Promise<AppResult<GetAllPmsResult>> {
    throw new Error('Method not implemented.');
  }
}
