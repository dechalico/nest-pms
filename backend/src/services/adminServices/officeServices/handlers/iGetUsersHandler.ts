import { AppResult } from '../../../../../src/common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { GetUsersResult, GetUsersArgs } from '../interactors/getUsersInteractor';

export abstract class IGetUsersHandler
  implements IAsyncInteractorHandler<GetUsersArgs, AppResult<GetUsersResult>>
{
  executeAsync(args: GetUsersArgs): Promise<AppResult<GetUsersResult>> {
    throw new Error('Method not implemented.');
  }
}
