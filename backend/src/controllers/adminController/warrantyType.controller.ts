import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateWarrantyTypeArgs,
  CreateWarrantyTypeResult,
} from './warrantyType.dtos/createWarrantyType.dto';
import { ICreateWarrantyType } from '../../services/adminServices/pmsServices/handlers/iCreateWarrantyTypeHandler';
import { IGetWarrantyTypesHandler } from '../../services/adminServices/pmsServices/handlers/iGetWarrantyTypesHandler';
import { plainToInstance } from 'class-transformer';
import { GetWarrantyTypeResult } from './warrantyType.dtos/getWarrantyType.dto';

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
  async getWarrantyTypes(): Promise<GetWarrantyTypeResult> {
    const result = await this.getWarrantyTypesHandler.executeAsync({});
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    return plainToInstance(GetWarrantyTypeResult, result.result, { excludeExtraneousValues: true });
  }
}
