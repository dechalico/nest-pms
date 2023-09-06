import { AppResult } from 'src/common/app.result';
import { IAsyncInteractorHandler } from '../../../common/asyncInteractorHandler';
import {
  RegisterUserArgs,
  RegisterUserResult,
} from '../interactors/registerUserInteractor';

export class IRegisterUserHandler
  implements
    IAsyncInteractorHandler<RegisterUserArgs, AppResult<RegisterUserResult>>
{
  executeAsync(args: RegisterUserArgs): Promise<AppResult<RegisterUserResult>> {
    throw new Error('Method not implemented.');
  }
}
