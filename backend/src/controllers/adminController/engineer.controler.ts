import { Controller, BadRequestException, Post, Body, Get, Put, Param } from '@nestjs/common';
import {
  CreateEngineerArgs,
  CreateEngineerResult,
  GetAllEngineersResult,
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
    if (!registerRes.Succeeded || !registerRes.Result) {
      throw new BadRequestException(registerRes.Message);
    }
    const result = plainToInstance(CreateEngineerResult, registerRes.Result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Get()
  async getAllEngineers(): Promise<GetAllEngineersResult> {
    const getEngineersRes = await this.getEngineersHandler.executeAsync({});
    if (!getEngineersRes.Succeeded || !getEngineersRes.Result) {
      throw new BadRequestException(getEngineersRes.Message);
    }
    const result = plainToInstance(GetAllEngineersResult, getEngineersRes.Result, {
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
    if (!updateRes.Succeeded || !updateRes.Result) {
      throw new BadRequestException(updateRes.Message);
    }
    const result = plainToInstance(UpdateEngineerResult, updateRes.Result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
