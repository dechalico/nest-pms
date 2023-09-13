import {
  Controller,
  BadRequestException,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import {
  CreateEngineerArgs,
  CreateEngineerResult,
  GetAllEngineersResult,
} from './engineer.dtos/createEngineer.dto';
import { IRegisterEngineerHandler } from '../../services/adminServices/officeServices/handlers/IRegisterEngineerHandler';
import { IGetEngineersHandler } from '../../services/adminServices/officeServices/handlers/iGetEngineersHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/engineers')
export class EngineerController {
  constructor(
    private readonly registerEngineerHandler: IRegisterEngineerHandler,
    private readonly getEngineersHandler: IGetEngineersHandler,
  ) {}

  @Post()
  async createEngineerAsync(
    @Body() args: CreateEngineerArgs,
  ): Promise<CreateEngineerResult> {
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
    const result = plainToInstance(
      GetAllEngineersResult,
      getEngineersRes.Result,
      { excludeExtraneousValues: true },
    );
    return result;
  }
}
