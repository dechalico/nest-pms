import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  GetClientArgs,
  GetClientResult,
} from '../interactors/getClientsInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class IGetClientsHandler
  implements IAsyncInteractorHandler<GetClientArgs, AppResult<GetClientResult>>
{
  executeAsync(args: GetClientArgs): Promise<AppResult<GetClientResult>> {
    throw new Error('Method not implemented.');
  }
}
