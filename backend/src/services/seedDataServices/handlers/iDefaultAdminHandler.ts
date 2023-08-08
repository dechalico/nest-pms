import { IAsyncInteractorHandler } from '../../../common/asyncInteractorHandler';
import {
  DefaultAdminArgs,
  DefaultAdminResult,
} from '../interactors/defaultAdminInteractors';
import { AppResult } from 'src/common/app.result';

export abstract class IDefaultAdminHandler
  implements
    IAsyncInteractorHandler<DefaultAdminArgs, AppResult<DefaultAdminResult>>
{
  abstract executeAsync(
    args: DefaultAdminArgs,
  ): Promise<AppResult<DefaultAdminResult>>;
}
