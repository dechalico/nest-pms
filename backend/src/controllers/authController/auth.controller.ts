import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { LoginArgs, LoginResult } from './dtos/login.dto';
import { ICreateLoginTokenHandler } from '../../services/authServices/handlers/iCreateLoginTokenHandler';
import { plainToInstance } from 'class-transformer';
import { AllowAnonymous } from '../../services/authServices/decorators/allowAnonymous';
import { IValidateUserInviteHandler } from '../../services/adminServices/officeServices/handlers/IValidateUserInviteHandler';
import {
  ValidateInviteResult,
  ValidateInviteArgs,
} from './dtos/validateInvite.dto';

@AllowAnonymous()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createLoginToken: ICreateLoginTokenHandler,
    private readonly validateToken: IValidateUserInviteHandler,
  ) {}

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

  @Get('validate-invite')
  async validateInvite(
    @Query() query: ValidateInviteArgs,
  ): Promise<ValidateInviteResult> {
    const validateRes = await this.validateToken.executeAsync({
      guid: query.guid,
      token: query.token,
    });
    if (
      !validateRes.Succeeded ||
      !validateRes.Result ||
      !validateRes.Result.isvalid
    ) {
      throw new BadRequestException(validateRes.Message);
    }
    const result = plainToInstance(ValidateInviteResult, validateRes.Result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
