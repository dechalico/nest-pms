import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  LockPmsHistoryInteractorArgs,
  LockPmsHistoryInteractorResult,
} from '../interactors/lockPmsHistoryInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class ILockPmsHistoryHandler
  implements
    IAsyncInteractorHandler<
      LockPmsHistoryInteractorArgs,
      AppResult<LockPmsHistoryInteractorResult>
    >
{
  executeAsync(
    args: LockPmsHistoryInteractorArgs,
  ): Promise<AppResult<LockPmsHistoryInteractorResult>> {
    throw new Error('Method not implemented.');
  }
}
