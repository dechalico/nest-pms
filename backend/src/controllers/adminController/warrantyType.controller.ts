import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreateWarrantyTypeArgs,
  CreateWarrantyTypeResult,
} from './warrantyType.dtos/createWarrantyType.dto';
import { ICreateWarrantyType } from '../../services/adminServices/pmsServices/handlers/iCreateWarrantyTypeHandler';
import { IGetWarrantyTypesHandler } from '../../services/adminServices/pmsServices/handlers/iGetWarrantyTypesHandler';
import { plainToInstance } from 'class-transformer';
import {
  GetWarrantyTypeResult,
  GetWarrantyTypesArgs,
} from './warrantyType.dtos/getWarrantyType.dto';

@Controller('/admin/warranty-types')
export class WarrantyTypeController {
  constructor(
    private readonly createWarrantyService: ICreateWarrantyType,
    private readonly getWarrantyTypesHandler: IGetWarrantyTypesHandler,
  ) {}

  @Post()
  async createWarrantyType(
    @Body() args: CreateWarrantyTypeArgs,
  ): Promise<CreateWarrantyTypeResult> {
    const result = await this.createWarrantyService.executeAsync(args);
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    return plainToInstance(CreateWarrantyTypeResult, result.result, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getWarrantyTypes(@Query() args: GetWarrantyTypesArgs): Promise<GetWarrantyTypeResult> {
    args.currentPage = args.currentPage || 1;
    args.pageSize = args.pageSize || 10;

    const allowedSearch = {
      name: 'name',
    };
    const like: any = {};

    if (args.searchBy && allowedSearch[args.searchBy] && args.searchValue) {
      like[allowedSearch[args.searchBy]] = args.searchValue;
    }

    const result = await this.getWarrantyTypesHandler.executeAsync({
      currentPage: args.currentPage,
      pageSize: args.pageSize,
      includePagination: true,
      like,
    });
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    return plainToInstance(GetWarrantyTypeResult, result.result, { excludeExtraneousValues: true });
  }
}
