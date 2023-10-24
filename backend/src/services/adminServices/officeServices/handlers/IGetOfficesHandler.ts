import { AppResult } from '../../../../../src/common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  GetOfficesArgs,
  GetOfficesResult,
} from '../interactors/getOfficesInteractor';

export abstract class IGetOfficesHandler
  implements
    IAsyncInteractorHandler<GetOfficesArgs, AppResult<GetOfficesResult>>
{
  executeAsync(args: GetOfficesArgs): Promise<AppResult<GetOfficesResult>> {
    throw new Error('Method not implemented.');
  }
}
