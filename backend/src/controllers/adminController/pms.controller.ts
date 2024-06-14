import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePmsArgs, CreatePmsResult } from './pms.dtos/createPMS.dto';
import { ICreatePmsHandler } from '../../services/adminServices/pmsServices/handlers/iCreatePmsHandler';
import { plainToInstance } from 'class-transformer';
import { IGetAllPmsHandler } from '../../services/adminServices/pmsServices/handlers/iGetAllPmsHandler';
import { GetAllPmsResult } from './pms.dtos/getAllPms.dto';

@Controller('/admin/pms')
export class PmsController {
  constructor(
    private readonly createPmsHandler: ICreatePmsHandler,
    private readonly getallPmsHandler: IGetAllPmsHandler,
  ) {}

  @Post()
  async createPms(@Body() args: CreatePmsArgs): Promise<CreatePmsResult> {
    const createRes = await this.createPmsHandler.executeAsync(args);
    if (!createRes.succeeded || !createRes.result) {
      throw new BadRequestException(createRes.message);
    }
    const result = plainToInstance(CreatePmsResult, createRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Get()
  async getAllPms(): Promise<GetAllPmsResult> {
    const allPmsRes = await this.getallPmsHandler.executeAsync({});
    if (!allPmsRes.succeeded || !allPmsRes.result) {
      throw new BadRequestException(allPmsRes.message);
    }

    const result = plainToInstance(GetAllPmsResult, allPmsRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
