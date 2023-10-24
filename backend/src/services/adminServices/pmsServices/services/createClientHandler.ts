import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { ICreateClientHandler } from '../handlers/iCreateClientHandler';
import {
  CreateClientArgs,
  CreateClientResult,
} from '../interactors/createClientInteractor';
import { Injectable } from '@nestjs/common';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { ClientService } from '../../../baseServices/services/client.service';

@Injectable()
export class CreateClientHandler implements ICreateClientHandler {
  constructor(
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly clientService: ClientService,
  ) {}

  async executeAsync(
    args: CreateClientArgs,
  ): Promise<AppResult<CreateClientResult>> {
    try {
      const currentUserRes = await this.currentUserHandler.executeAsync({});
      if (!currentUserRes.Succeeded || !currentUserRes.Result) {
        return AppResult.createFailed(
          new Error(currentUserRes.Message),
          currentUserRes.Message,
        );
      }
      const currentUser = currentUserRes.Result;

      const createClientRes = await this.clientService.createClientAsync({
        areaOfficeId: currentUser.areaOfficeId,
        city: args.city,
        name: args.name,
      });
      if (!createClientRes.Succeeded || !createClientRes.Result) {
        return AppResult.createFailed(
          new Error(createClientRes.Message),
          createClientRes.Message,
        );
      }
      const created = createClientRes.Result;

      return AppResult.createSucceeded(
        {
          areaOfficeId: created.areaOfficeId,
          city: created.city,
          dateCreated: created.dateCreated,
          id: created.id,
          name: created.name,
        },
        'Client successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating client.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
