import { Controller, Post, Get, Body, BadRequestException, Query } from '@nestjs/common';
import { LoginArgs, LoginResult } from './dtos/login.dto';
import { ICreateLoginTokenHandler } from '../../services/authServices/handlers/iCreateLoginTokenHandler';
import { plainToInstance } from 'class-transformer';
import { AllowAnonymous } from '../../services/authServices/decorators/allowAnonymous';
import { IValidateUserInviteHandler } from '../../services/authServices/handlers/IValidateUserInviteHandler';
import { ValidateInviteResult, ValidateInviteArgs } from './dtos/validateInvite.dto';
import { RegisterArgs, RegisterResult } from './dtos/register.dto';
import { IRegisterUserHandler } from '../../services/authServices/handlers/iRegisterUserHandler';

@AllowAnonymous()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createLoginToken: ICreateLoginTokenHandler,
    private readonly validateToken: IValidateUserInviteHandler,
    private readonly registerHandler: IRegisterUserHandler,
  ) {}

  @Post('login')
  async login(@Body() loginArgs: LoginArgs): Promise<LoginResult> {
    const validateResult = await this.createLoginToken.executeAsync(loginArgs);
    if (!validateResult.succeeded || !validateResult.result) {
      throw new BadRequestException(validateResult.message);
    }
    const result = plainToInstance(LoginResult, validateResult.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Get('validate-invite')
  async validateInvite(@Query() query: ValidateInviteArgs): Promise<ValidateInviteResult> {
    const validateRes = await this.validateToken.executeAsync({
      guid: query.guid,
      token: query.token,
    });
    if (!validateRes.succeeded || !validateRes.result || !validateRes.result.isvalid) {
      throw new BadRequestException(validateRes.message);
    }
    const result = plainToInstance(ValidateInviteResult, validateRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Post('register')
  async register(@Body() args: RegisterArgs): Promise<RegisterResult> {
    const registerRes = await this.registerHandler.executeAsync(args);
    if (!registerRes.succeeded || !registerRes.result) {
      throw new BadRequestException(registerRes.message);
    }
    const result = plainToInstance(RegisterResult, registerRes.result, {
      excludeExtraneousValues: true,
    });
    return result;
  }
}
