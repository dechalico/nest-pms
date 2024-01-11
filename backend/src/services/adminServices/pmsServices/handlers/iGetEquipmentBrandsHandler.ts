import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { AppResult } from '../../../../common/app.result';
import {
  GetEquipmentBrandArgs,
  GetEquipmentBrandResult,
} from '../interactors/getEquipmentBrandsInteractor';

export abstract class IGetEquipmentBrandHandler
  implements IAsyncInteractorHandler<GetEquipmentBrandArgs, AppResult<GetEquipmentBrandResult>>
{
  executeAsync(args: GetEquipmentBrandArgs): Promise<AppResult<GetEquipmentBrandResult>> {
    throw new Error('Method not implemented.');
  }
}
