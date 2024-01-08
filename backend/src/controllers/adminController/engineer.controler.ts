import {
  Controller,
  BadRequestException,
  Post,
  Body,
  Get,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import {
  CreateEngineerArgs,
  CreateEngineerResult,
  GetAllEngineersResult,
  GetAllEngineersArgs,
} from './engineer.dtos/createEngineer.dto';
import { UpdateEngineerArgs, UpdateEngineerResult } from './engineer.dtos/updateEngineer.dto';
import { IRegisterEngineerHandler } from '../../services/adminServices/officeServices/handlers/IRegisterEngineerHandler';
import { IGetEngineersHandler } from '../../services/adminServices/officeServices/handlers/iGetEngineersHandler';
import { IUpdateEngineerHandler } from '../../services/adminServices/officeServices/handlers/iUpdateEngineerHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/engineers')
export class EngineerController {
  constructor(
    private readonly registerEngineerHandler: IRegisterEngineerHandler,
    private readonly getEngineersHandler: IGetEngineersHandler,
    private readonly updateEngineerHandler: IUpdateEngineerHandler,
  ) {}

  @Post()
  async createEngineerAsync(@Body() args: CreateEngineerArgs): Promise<CreateEngineerResult> {
    const registerRes = await this.registerEngineerHandler.executeAsync(args);
    if (!registerRes.succeeded || !registerRes.result) {
      throw new BadRequestException(registerRes.message);
    }
    const result = plainToInstance(CreateEngineerResult, registerRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Get()
  async getAllEngineers(@Query() args: GetAllEngineersArgs): Promise<GetAllEngineersResult> {
    const getEngineersRes = await this.getEngineersHandler.executeAsync({
      includes: {
        areaOffice: args.includeOffice,
      },
    });
    if (!getEngineersRes.succeeded || !getEngineersRes.result) {
      throw new BadRequestException(getEngineersRes.succeeded);
    }
    const result = plainToInstance(GetAllEngineersResult, getEngineersRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Put(':id')
  async updateEngineer(
    @Body() args: UpdateEngineerArgs,
    @Param('id') id: string,
  ): Promise<UpdateEngineerResult> {
    const updateRes = await this.updateEngineerHandler.executeAsync({
      id,
      ...args,
    });
    if (!updateRes.succeeded || !updateRes.result) {
      throw new BadRequestException(updateRes.message);
    }
    const result = plainToInstance(UpdateEngineerResult, updateRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
