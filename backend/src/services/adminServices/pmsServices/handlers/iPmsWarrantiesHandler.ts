import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { AppResult } from '../../../../common/app.result';
import { PmsWarrantiesArgs, PmsWarrantiesResult } from '../interactors/pmsWarrantiesInteractor';

export abstract class IPmsWarrantiesHandler
  implements IAsyncInteractorHandler<PmsWarrantiesArgs, AppResult<PmsWarrantiesResult>>
{
  executeAsync(args: PmsWarrantiesArgs): Promise<AppResult<PmsWarrantiesResult>> {
    throw new Error('Method not implemented.');
  }
}
