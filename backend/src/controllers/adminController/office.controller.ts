import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { CreateOffice, CreateOfficeResult } from './dtos/office.dto';
import { ICreateOfficeHandler } from '../../services/adminServices/officeServices/handlers/iCreateOfficeHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/office')
export class OfficeController {
  constructor(private readonly createOfficeHandler: ICreateOfficeHandler) {}

  @Post('/create-office')
  async createOffice(@Body() args: CreateOffice): Promise<CreateOfficeResult> {
    const result = await this.createOfficeHandler.executeAsync(args);
    if (!result.Succeeded || !result.Result) {
      throw new BadRequestException(result.Message);
    }
    const objResult = plainToInstance(CreateOfficeResult, result.Result, {
      excludeExtraneousValues: true,
    });
    return objResult;
  }
}
