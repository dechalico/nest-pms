import {
  UpdateWarrantyTypeArgs,
  UpdateWarrantypeResult,
} from '../interactors/updateWarrantyTypeInteractor';
import { AppResult } from '../../../../common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';

export abstract class IUpdateWarrantyTypeHandler
  implements IAsyncInteractorHandler<UpdateWarrantyTypeArgs, AppResult<UpdateWarrantypeResult>>
{
  executeAsync(args: UpdateWarrantyTypeArgs): Promise<AppResult<UpdateWarrantypeResult>> {
    throw new Error('Method not implemented.');
  }
}
