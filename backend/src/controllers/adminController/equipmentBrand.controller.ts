import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateEquipmentBrandArgs,
  CreateEquipmentBrandResult,
} from './equipmentBrand.dtos/createEquipmentBrand.dto';
import { ICreateEquipmentBrandHandler } from '../../services/adminServices/pmsServices/handlers/iCreateEquipmentBrandHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/equipment-brands')
export class EquipmentBrandController {
  constructor(private readonly createEquipmentBrandHandler: ICreateEquipmentBrandHandler) {}

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
}
