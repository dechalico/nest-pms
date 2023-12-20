import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { ProfileArgs, ProfileResult } from '../interactors/profileInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class IProfileHandler
  implements IAsyncInteractorHandler<ProfileArgs, AppResult<ProfileResult>>
{
  executeAsync(args: ProfileArgs): Promise<AppResult<ProfileResult>> {
    throw new Error('Method not implemented.');
  }
}
