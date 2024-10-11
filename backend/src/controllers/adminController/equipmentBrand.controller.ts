import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreateEquipmentBrandArgs,
  CreateEquipmentBrandResult,
} from './equipmentBrand.dtos/createEquipmentBrand.dto';
import {
  GetEquipmentBrandsResult,
  GetEquipmentBrandsArgs,
} from './equipmentBrand.dtos/getEquipmentBrands.dto';
import { ICreateEquipmentBrandHandler } from '../../services/adminServices/pmsServices/handlers/iCreateEquipmentBrandHandler';
import { plainToInstance } from 'class-transformer';
import { IGetEquipmentBrandHandler } from '../../services/adminServices/pmsServices/handlers/iGetEquipmentBrandsHandler';

@Controller('/admin/equipment-brands')
export class EquipmentBrandController {
  constructor(
    private readonly createEquipmentBrandHandler: ICreateEquipmentBrandHandler,
    private readonly getEquipmentBrandsHandler: IGetEquipmentBrandHandler,
  ) {}

  @Post()
  async createEquipmentBrand(
    @Body() args: CreateEquipmentBrandArgs,
  ): Promise<CreateEquipmentBrandResult> {
    const result = await this.createEquipmentBrandHandler.executeAsync(args);
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }

    const objResult = plainToInstance(CreateEquipmentBrandResult, result.result, {
      excludeExtraneousValues: true,
    });
    return objResult;
  }

  @Get()
  async getEquipmentBrands(
    @Query() args: GetEquipmentBrandsArgs,
  ): Promise<GetEquipmentBrandsResult> {
    args.currentPage = args.currentPage || 1;
    args.pageSize = args.pageSize || 10;

    const allowedSearch = {
      name: 'name',
    };
    const like: any = {};

    if (args.searchBy && allowedSearch[args.searchBy] && args.searchValue) {
      like[allowedSearch[args.searchBy]] = args.searchValue;
    }

    const result = await this.getEquipmentBrandsHandler.executeAsync({
      currentPage: args.currentPage,
      pageSize: args.pageSize,
      includePagination: true,
      like,
    });
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }

    return plainToInstance(GetEquipmentBrandsResult, result.result);
  }
}
