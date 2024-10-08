import { Controller, Body, Post, Get, BadRequestException, Query } from '@nestjs/common';
import { CreateOffice, CreateOfficeResult } from './office.dtos/create.office.dto';
import { ICreateOfficeHandler } from '../../services/adminServices/officeServices/handlers/iCreateOfficeHandler';
import { plainToInstance } from 'class-transformer';
import { GetOfficeResult, GetOfficesArgs } from './office.dtos/get.office.dto';
import { IGetOfficesHandler } from '../../services/adminServices/officeServices/handlers/IGetOfficesHandler';

@Controller('/admin/offices')
export class OfficeController {
  constructor(
    private readonly createOfficeHandler: ICreateOfficeHandler,
    private readonly getOfficesHandler: IGetOfficesHandler,
  ) {}

  @Post()
  async createOffice(@Body() args: CreateOffice): Promise<CreateOfficeResult> {
    const result = await this.createOfficeHandler.executeAsync(args);
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    const objResult = plainToInstance(CreateOfficeResult, result.result, {
      excludeExtraneousValues: true,
    });
    return objResult;
  }

  @Get()
  async getOffices(@Query() args: GetOfficesArgs): Promise<GetOfficeResult> {
    args.currentPage = args.currentPage || 1;
    args.pageSize = args.pageSize || 10;

    const result = await this.getOfficesHandler.executeAsync({
      currentPage: args.currentPage,
      pageSize: args.pageSize,
      includePagination: true,
    });
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }

    const objResult = plainToInstance(GetOfficeResult, result.result);
    return objResult;
  }
}
