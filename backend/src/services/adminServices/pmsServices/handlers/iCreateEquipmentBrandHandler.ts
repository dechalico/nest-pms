import { IAsyncInteractorHandler } from '../../../../common/asyncInteractorHandler';
import { AppResult } from '../../../../common/app.result';
import {
  CreateEquipmentBrandArgs,
  CreateEquipmentBrandResult,
} from '../interactors/createEquipmentBrandInteractor';

export abstract class ICreateEquipmentBrandHandler
  implements
    IAsyncInteractorHandler<CreateEquipmentBrandArgs, AppResult<CreateEquipmentBrandResult>>
{
  executeAsync(args: CreateEquipmentBrandArgs): Promise<AppResult<CreateEquipmentBrandResult>> {
    throw new Error('Method not implemented.');
  }
}
