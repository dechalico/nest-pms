import { IAsyncInteractorHandler } from 'src/common/asyncInteractorHandler';
import {
  ValidateUserInviteArgs,
  ValidateUserInviteResult,
} from '../interactors/validateUserInviteInteractor';
import { AppResult } from '../../../../src/common/app.result';

export abstract class IValidateUserInviteHandler
  implements IAsyncInteractorHandler<ValidateUserInviteArgs, AppResult<ValidateUserInviteResult>>
{
  executeAsync(args: ValidateUserInviteArgs): Promise<AppResult<ValidateUserInviteResult>> {
    throw new Error('Method not implemented.');
  }
}
