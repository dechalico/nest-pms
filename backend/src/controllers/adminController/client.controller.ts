import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateClientArgs,
  CreateClientResult,
} from './client.dtos/createClient.dto';
import { GetClientsResult } from './client.dtos/getClient.dto';
import { ICreateClientHandler } from '../../services/adminServices/pmsServices/handlers/iCreateClientHandler';
import { IGetClientsHandler } from '../../services/adminServices/pmsServices/handlers/iGetClientsHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/clients')
export class ClientController {
  constructor(
    private readonly createClientHandler: ICreateClientHandler,
    private readonly getClientsHandler: IGetClientsHandler,
  ) {}

  @Post()
  async createClient(
    @Body() args: CreateClientArgs,
  ): Promise<CreateClientResult> {
    const createClientRes = await this.createClientHandler.executeAsync(args);
    if (!createClientRes.Succeeded || !createClientRes.Result) {
      throw new BadRequestException(createClientRes.Message);
    }
    const result = plainToInstance(CreateClientResult, createClientRes.Result);
    return result;
  }

  @Get()
  async getClients(): Promise<GetClientsResult> {
    const getClientsRes = await this.getClientsHandler.executeAsync({});
    if (!getClientsRes.Succeeded || !getClientsRes.Result) {
      throw new BadRequestException(getClientsRes.Message);
    }
    const result = plainToInstance(GetClientsResult, getClientsRes.Result);
    return result;
  }
}
