import {
  CreateWarrantyTypeArgs,
  CreateWarrantyTypeResult,
} from '../interactors/createWarrantyTypeInteractor';
import { AppResult } from '../../../../common/app.result';
import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';

export abstract class ICreateWarrantyType
  implements IAsyncInteractorHandler<CreateWarrantyTypeArgs, AppResult<CreateWarrantyTypeResult>>
{
  executeAsync(args: CreateWarrantyTypeArgs): Promise<AppResult<CreateWarrantyTypeResult>> {
    throw new Error('Method not implemented.');
  }
}
