import { Controller, Post, Get, Body, BadRequestException, Query } from '@nestjs/common';
import { CreateClientArgs, CreateClientResult } from './client.dtos/createClient.dto';
import { GetClientsResult, GetClientsArgs } from './client.dtos/getClient.dto';
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
  async createClient(@Body() args: CreateClientArgs): Promise<CreateClientResult> {
    const createClientRes = await this.createClientHandler.executeAsync(args);
    if (!createClientRes.succeeded || !createClientRes.result) {
      throw new BadRequestException(createClientRes.message);
    }
    const result = plainToInstance(CreateClientResult, createClientRes.result);
    return result;
  }

  @Get()
  async getClients(@Query() args: GetClientsArgs): Promise<GetClientsResult> {
    args.currentPage = args.currentPage || 1;
    args.pageSize = args.pageSize || 10;

    const getClientsRes = await this.getClientsHandler.executeAsync({
      includePagination: true,
      currentPage: args.currentPage,
      pageSize: args.pageSize,
    });
    if (!getClientsRes.succeeded || !getClientsRes.result) {
      throw new BadRequestException(getClientsRes.message);
    }
    const result = plainToInstance(GetClientsResult, getClientsRes.result);
    return result;
  }
}
