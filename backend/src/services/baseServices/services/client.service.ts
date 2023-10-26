import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repository/services/clientRepository.service';
import {
  CreateClientSchema,
  UpdateClientSchema,
  ClientSchema,
  GetAllArgs,
} from '../schemas/client.schema';
import { AppResult, AppErrorCodes } from '../../../common/app.result';
import { AreaOfficeRepository } from '../../repository/services/areaOfficeRepository.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly areaOfficeRepository: AreaOfficeRepository,
  ) {}

  async createClientAsync(args: CreateClientSchema): Promise<AppResult<ClientSchema>> {
    try {
      // check area office repository
      const areaChkRes = await this.areaOfficeRepository.getByIdAsync(args.areaOfficeId);
      if (!areaChkRes.succeeded || !areaChkRes.result) {
        return AppResult.createFailed(
          new Error('Invalid area office id.'),
          'Invalid area office id.',
          AppErrorCodes.InvalidRequest,
        );
      }

      const createRes = await this.clientRepository.createAsync({
        _id: undefined,
        area_office_id: args.areaOfficeId,
        city: args.city,
        date_created: new Date(),
        date_updated: undefined,
        name: args.name,
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }

      const result: ClientSchema = createRes.result;
      return AppResult.createSucceeded(result, 'Client successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating client.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateClientAsync(args: UpdateClientSchema): Promise<AppResult<ClientSchema>> {
    try {
      if (args.areaOfficeId) {
        // check area office repository
        const areaChkRes = await this.areaOfficeRepository.getByIdAsync(args.areaOfficeId);
        if (!areaChkRes.succeeded || !areaChkRes.result) {
          return AppResult.createFailed(
            new Error('Invalid area office id.'),
            'Invalid area office id.',
            AppErrorCodes.InvalidRequest,
          );
        }
      }

      const updateRes = await this.clientRepository.updateAsync({
        _id: args.id,
        area_office_id: args.areaOfficeId,
        city: args.city,
        date_updated: new Date(),
        name: args.city,
      });
      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(
          new Error(updateRes.message),
          updateRes.message,
          updateRes.error.code,
        );
      }

      const result: ClientSchema = updateRes.result;
      return AppResult.createSucceeded(result, 'Client successfully updated');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating client.',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getAllClients(args: GetAllArgs): Promise<AppResult<Array<ClientSchema>>> {
    try {
      const filter: any = {};
      if (args.areaOfficeId) {
        filter.area_office_id = args.areaOfficeId;
      }
      const getClientsRes = await this.clientRepository.getAllAsync({ filter });
      if (!getClientsRes.succeeded || !getClientsRes.result) {
        return AppResult.createFailed(
          new Error(getClientsRes.message),
          getClientsRes.message,
          getClientsRes.error.code,
        );
      }

      const result: Array<ClientSchema> = getClientsRes.result;
      return AppResult.createSucceeded(result, 'Successfully get list of clients.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting clients record.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
