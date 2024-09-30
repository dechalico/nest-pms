import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import {
  ExtendPmsWarrantyArgs,
  ExtendPmsWarrantyResult,
} from '../interactors/extendPmsWarrantyInteractor';
import { AppResult } from '../../../../common/app.result';

export abstract class IExtendPmsWarrantyHandler
  implements IAsyncInteractorHandler<ExtendPmsWarrantyArgs, AppResult<ExtendPmsWarrantyResult>>
{
  executeAsync(args: ExtendPmsWarrantyArgs): Promise<AppResult<ExtendPmsWarrantyResult>> {
    throw new Error('Method not implemented.');
  }
}
