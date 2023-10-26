import { AppErrorCodes, AppResult } from '../../../../common/app.result';
import { ICreateClientHandler } from '../handlers/iCreateClientHandler';
import { CreateClientArgs, CreateClientResult } from '../interactors/createClientInteractor';
import { Injectable } from '@nestjs/common';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';
import { ClientService } from '../../../baseServices/services/client.service';

@Injectable()
export class CreateClientHandler implements ICreateClientHandler {
  constructor(
    private readonly currentUserHandler: ICurrentUserHandler,
    private readonly clientService: ClientService,
  ) {}

  async executeAsync(args: CreateClientArgs): Promise<AppResult<CreateClientResult>> {
    try {
      const currentUserRes = await this.currentUserHandler.executeAsync({});
      if (!currentUserRes.succeeded || !currentUserRes.result) {
        return AppResult.createFailed(new Error(currentUserRes.message), currentUserRes.message);
      }
      const currentUser = currentUserRes.result;

      const createClientRes = await this.clientService.createClientAsync({
        areaOfficeId: currentUser.areaOfficeId,
        city: args.city,
        name: args.name,
      });
      if (!createClientRes.succeeded || !createClientRes.result) {
        return AppResult.createFailed(new Error(createClientRes.message), createClientRes.message);
      }
      const created = createClientRes.result;

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
