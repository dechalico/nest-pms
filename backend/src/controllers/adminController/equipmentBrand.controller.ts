import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateEquipmentBrandArgs,
  CreateEquipmentBrandResult,
} from './equipmentBrand.dtos/createEquipmentBrand.dto';
import { GetEquipmentBrandsResult } from './equipmentBrand.dtos/getEquipmentBrands.dto';
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
  async getEquipmentBrands(): Promise<GetEquipmentBrandsResult> {
    const result = await this.getEquipmentBrandsHandler.executeAsync({});
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }

    return plainToInstance(GetEquipmentBrandsResult, result.result);
  }
}
