import { AppResult, AppErrorCodes } from '../../../../common/app.result';
import { IGetClientsHandler } from '../handlers/iGetClientsHandler';
import {
  Client,
  GetClientArgs,
  GetClientResult,
  Pagination,
} from '../interactors/getClientsInteractor';
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

      const skip = args.pageSize * (args.currentPage - 1);
      const limit = args.pageSize;

      const clientsRes = await this.clientService.getAllClients({
        areaOfficeId: currentUser.areaOfficeId,
        like: args.like,
        skip,
        limit,
      });
      if (!clientsRes.succeeded || !clientsRes.result) {
        return AppResult.createFailed(
          new Error(clientsRes.message),
          clientsRes.message,
          clientsRes.error.code,
        );
      }

      let pagination: Pagination | undefined = undefined;
      if (args.includePagination) {
        const clientsCountRes = await this.clientService.countClients({
          areaOfficeId: currentUser.areaOfficeId,
          like: args.like,
        });
        if (!clientsCountRes.succeeded) {
          return AppResult.createFailed(
            new Error(clientsCountRes.message),
            clientsCountRes.message,
            clientsCountRes.error.code,
          );
        }

        const totalCount = clientsCountRes.result;
        const totalPages = Math.ceil(totalCount / args.pageSize);

        pagination = {
          currentPage: args.currentPage,
          pageSize: args.pageSize,
          totalCount,
          totalPages,
        };
      }

      const result: Array<Client> = clientsRes.result;
      return AppResult.createSucceeded(
        {
          clients: result,
          pagination,
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
