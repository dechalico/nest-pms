import {
  Controller,
  Body,
  Post,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { CreateOffice, CreateOfficeResult } from './dtos/create.office.dto';
import { ICreateOfficeHandler } from '../../services/adminServices/officeServices/handlers/iCreateOfficeHandler';
import { plainToInstance } from 'class-transformer';
import { GetOfficeResult } from './dtos/get.office.dto';
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
    if (!result.Succeeded || !result.Result) {
      throw new BadRequestException(result.Message);
    }
    const objResult = plainToInstance(CreateOfficeResult, result.Result, {
      excludeExtraneousValues: true,
    });
    return objResult;
  }

  @Get()
  async getOffices(): Promise<GetOfficeResult> {
    const result = await this.getOfficesHandler.executeAsync({});
    if (!result.Succeeded || !result.Result) {
      throw new BadRequestException(result.Message);
    }

    const objResult = plainToInstance(GetOfficeResult, result.Result);
    return objResult;
  }
}
