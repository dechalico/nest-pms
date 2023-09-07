import { Controller, BadRequestException, Post, Body } from '@nestjs/common';
import {
  CreateEngineerArgs,
  CreateEngineerResult,
} from './engineer.dtos/createEngineer.dto';
import { IRegisterEngineerHandler } from '../../services/adminServices/officeServices/handlers/IRegisterEngineerHandler';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/engineers')
export class EngineerController {
  constructor(
    private readonly registerEngineerHandler: IRegisterEngineerHandler,
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
}
