import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { AppResult } from '../../../../common/app.result';
import {
  GetWarrantyTypeArgs,
  GetWarrantyTypeResult,
} from '../interactors/getWarrantyTypesInteractor';

export abstract class IGetWarrantyTypesHandler
  implements IAsyncInteractorHandler<GetWarrantyTypeArgs, AppResult<GetWarrantyTypeResult>>
{
  executeAsync(args: GetWarrantyTypeArgs): Promise<AppResult<GetWarrantyTypeResult>> {
    throw new Error('Method not implemented.');
  }
}
