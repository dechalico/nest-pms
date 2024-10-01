import { AppResult } from '../../../../common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { UpdateWarrantyArgs, UpdateWarrantyResult } from '../interactors/updateWarrantyInteractor';

export abstract class IUpdateWarrantyHandler
  implements IAsyncInteractorHandler<UpdateWarrantyArgs, AppResult<UpdateWarrantyResult>>
{
  executeAsync(args: UpdateWarrantyArgs): Promise<AppResult<UpdateWarrantyResult>> {
    throw new Error('Method not implemented.');
  }
}
