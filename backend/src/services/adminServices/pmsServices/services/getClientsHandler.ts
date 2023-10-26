import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IGetClientsHandler } from '../handlers/iGetClientsHandler';
import { Client, GetClientArgs, GetClientResult } from '../interactors/getClientsInteractor';
import { Injectable } from '@nestjs/common';
import { ClientService } from '../../../baseServices/services/client.service';
import { ICurrentUserHandler } from '../../../authServices/handlers/ICurrentUserHandler';

@Injectable()
export class GetClientsHandler implements IGetClientsHandler {
  constructor(
    private readonly clientService: ClientService,
    private readonly currentUserHandler: ICurrentUserHandler,
  ) {}

  async executeAsync(args: GetClientArgs): Promise<AppResult<GetClientResult>> {
    try {
      const currentUserRes = await this.currentUserHandler.executeAsync({});
      if (!currentUserRes.succeeded || !currentUserRes.result) {
        return AppResult.createFailed(
          new Error(currentUserRes.message),
          currentUserRes.message,
          currentUserRes.error.code,
        );
      }
      const currentUser = currentUserRes.result;

      const clientsRes = await this.clientService.getAllClients({
        areaOfficeId: currentUser.areaOfficeId,
      });
      if (!clientsRes.succeeded || !clientsRes.result) {
        return AppResult.createFailed(
          new Error(clientsRes.message),
          clientsRes.message,
          clientsRes.error.code,
        );
      }

      const result: Array<Client> = clientsRes.result;
      return AppResult.createSucceeded(
        {
          clients: result,
        },
        'Clients successfully get',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting list of clients.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
