import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { LoginArgs, LoginResult } from './dtos/login.dto';
import { ICreateLoginTokenHandler } from '../../services/authServices/handlers/iCreateLoginTokenHandler';
import { plainToInstance } from 'class-transformer';
import { AllowAnonymous } from '../../services/authServices/decorators/allowAnonymous';

@AllowAnonymous()
@Controller('auth')
export class AuthController {
  constructor(private readonly createLoginToken: ICreateLoginTokenHandler) {}

  @Post('login')
  async login(@Body() loginArgs: LoginArgs): Promise<LoginResult> {
    const validateResult = await this.createLoginToken.executeAsync(loginArgs);
    if (!validateResult.Succeeded || !validateResult.Result) {
      throw new BadRequestException(validateResult.Message);
    }
    const result = plainToInstance(LoginResult, validateResult.Result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
