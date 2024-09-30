import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePmsArgs, CreatePmsResult } from './pms.dtos/createPMS.dto';
import { GetPmsResult } from './pms.dtos/getPms.dto';
import { ICreatePmsHandler } from '../../services/adminServices/pmsServices/handlers/iCreatePmsHandler';
import { plainToInstance } from 'class-transformer';
import { IGetAllPmsHandler } from '../../services/adminServices/pmsServices/handlers/iGetAllPmsHandler';
import { GetAllPmsResult } from './pms.dtos/getAllPms.dto';
import { IGetPmsHandler } from '../../services/adminServices/pmsServices/handlers/iGetPmsHandler';
import { PmsWarrantiesResult } from './pms.dtos/pmsWarranties.dto';
import { IPmsWarrantiesHandler } from '../../services/adminServices/pmsServices/handlers/iPmsWarrantiesHandler';
import { UpdateWarrantyArgs, UpdateWarrantyResult } from './pms.dtos/updatePMSWarranty.dto';
import { IUpdateWarrantyHandler } from '../../services/adminServices/pmsServices/handlers/iUpdateWarrantyHandler';

@Controller('/admin/pms')
export class PmsController {
  constructor(
    private readonly createPmsHandler: ICreatePmsHandler,
    private readonly getallPmsHandler: IGetAllPmsHandler,
    private readonly getPmsHandler: IGetPmsHandler,
    private readonly pmsWarrantiesHandler: IPmsWarrantiesHandler,
    private readonly updateWarrantyHandler: IUpdateWarrantyHandler,
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

  @Get(':id')
  async getPms(@Param('id') id: string): Promise<GetPmsResult> {
    const pmsRes = await this.getPmsHandler.executeAsync({ id });
    if (!pmsRes.succeeded || !pmsRes.result) {
      throw new BadRequestException(pmsRes.message);
    }

    const result = plainToInstance(GetPmsResult, pmsRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Get(':id/warranties')
  async getPmsWarranties(@Param('id') id: string): Promise<PmsWarrantiesResult> {
    const pmsRes = await this.pmsWarrantiesHandler.executeAsync({ pmsId: id });
    if (!pmsRes.succeeded || !pmsRes.result) {
      throw new BadRequestException(pmsRes.message);
    }

    const result = plainToInstance(PmsWarrantiesResult, pmsRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  // prettier-ignore
  @Put('warranties/:id')
  async updateWarranty(@Param('id') id: string, @Body() args: UpdateWarrantyArgs): Promise<UpdateWarrantyResult> {
    const updateRes = await this.updateWarrantyHandler.executeAsync({
      id,
      ...args,
    });
    if (!updateRes.succeeded || !updateRes.result) {
      throw new BadRequestException(updateRes.message);
    }

    const result = plainToInstance(UpdateWarrantyResult, updateRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
