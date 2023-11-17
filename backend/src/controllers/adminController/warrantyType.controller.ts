import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateWarrantyTypeArgs,
  CreateWarrantyTypeResult,
} from './warrantyType.dtos/createWarrantyType.dto';
import { ICreateWarrantyType } from '../../services/adminServices/pmsServices/handlers/iCreateWarrantyTypeHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/warranty-type')
export class WarrantyTypeController {
  constructor(private readonly createWarrantyService: ICreateWarrantyType) {}

  @Post()
  async createWarrantyType(
    @Body() args: CreateWarrantyTypeArgs,
  ): Promise<CreateWarrantyTypeResult> {
    const result = await this.createWarrantyService.executeAsync(args);
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    const obj = plainToInstance(CreateWarrantyTypeResult, result.result);
    return obj;
  }
}
