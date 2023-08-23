import { AppResult } from 'src/common/app.result';
import { IAsyncInteractorHandler } from '../../../common/asyncInteractorHandler';
import {
  CurrentUserArgs,
  CurrentUserResult,
} from '../interactors/currentUserInteractor';

export abstract class ICurrentUserHandler
  implements
    IAsyncInteractorHandler<CurrentUserArgs, AppResult<CurrentUserResult>>
{
  executeAsync(args: CurrentUserArgs): Promise<AppResult<CurrentUserResult>> {
    throw new Error('Method not implemented.');
  }
}
