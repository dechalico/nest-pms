import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { ICreateUserInviteHandler } from '../../services/adminServices/officeServices/handlers/iCreateUserInviteHandler';
import {
  CreateUserInviteResult,
  CreateUserInviteArgs,
} from './user.dtos/createUserInvite.user.dto';
import { CurrentLoginResult } from './user.dtos/currentLogin.dto';
import { plainToInstance } from 'class-transformer';
import { IProfileHandler } from '../../services/adminServices/accountServices/handlers/iProfileHandler';

@Controller('/admin/users')
export class UserController {
  constructor(
    private readonly creaUserInviteHandler: ICreateUserInviteHandler,
    private readonly profileHandler: IProfileHandler,
  ) {}

  @Post('create-invite')
  async createUserInvite(@Body() args: CreateUserInviteArgs): Promise<CreateUserInviteResult> {
    const result = await this.creaUserInviteHandler.executeAsync(args);
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    const obj = plainToInstance(CreateUserInviteResult, result.result);
    return obj;
  }

  @Get('current-login')
  async currentLogin(): Promise<CurrentLoginResult> {
    const profileRes = await this.profileHandler.executeAsync({});
    if (!profileRes.succeeded || !profileRes.result) {
      throw new BadRequestException(profileRes.message);
    }

    const obj = plainToInstance(CurrentLoginResult, profileRes.result, {
      excludeExtraneousValues: true,
    });
    return obj;
  }
}
