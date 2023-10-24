import { AppResult } from '../../../../../src/common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  CreateUserInviteArgs,
  CreateUserInviteResult,
} from '../interactors/createUserInviteInteractor';

export abstract class ICreateUserInviteHandler
  implements
    IAsyncInteractorHandler<
      CreateUserInviteArgs,
      AppResult<CreateUserInviteResult>
    >
{
  executeAsync(
    args: CreateUserInviteArgs,
  ): Promise<AppResult<CreateUserInviteResult>> {
    throw new Error('Method not implemented.');
  }
}
