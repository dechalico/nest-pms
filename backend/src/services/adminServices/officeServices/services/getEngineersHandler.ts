import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { IGetEngineersHandler } from '../handlers/iGetEngineersHandler';
import {
  GetEngineersArgs,
  GetEngineersResult,
  Engineer,
} from '../interactors/getEngineersInteractor';
import { Injectable } from '@nestjs/common';
import { EngineerService } from '../../../baseServices/services/engineer.service';

@Injectable()
export class GetEngineersHandler implements IGetEngineersHandler {
  constructor(private readonly engineerService: EngineerService) {}

  async executeAsync(args: GetEngineersArgs): Promise<AppResult<GetEngineersResult>> {
    try {
      const engineerRes = await this.engineerService.getAllEngineersAsync();
      if (!engineerRes.Succeeded || !engineerRes.Result) {
        return AppResult.createFailed(
          new Error(engineerRes.Message),
          engineerRes.Message,
          engineerRes.Error.code,
        );
      }
      const result: Array<Engineer> = engineerRes.Result;
      return AppResult.createSucceeded({ engineers: result }, 'Successfully get all engineers');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to get engineers.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
