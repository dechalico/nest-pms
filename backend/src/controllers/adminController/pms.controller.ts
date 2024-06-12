import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreatePmsArgs, CreatePmsResult } from './pms.dtos/createPMS.dto';
import { ICreatePmsHandler } from '../../services/adminServices/pmsServices/handlers/iCreatePmsHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/pms')
export class PmsController {
  constructor(private readonly createPmsHandler: ICreatePmsHandler) {}

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
}
