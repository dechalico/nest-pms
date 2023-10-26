import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ICreateUserInviteHandler } from '../../services/adminServices/officeServices/handlers/iCreateUserInviteHandler';
import {
  CreateUserInviteResult,
  CreateUserInviteArgs,
} from './user.dtos/createUserInvite.user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('/admin/users')
export class UserController {
  constructor(private readonly creaUserInviteHandler: ICreateUserInviteHandler) {}

  @Post('create-invite')
  async createUserInvite(@Body() args: CreateUserInviteArgs): Promise<CreateUserInviteResult> {
    const result = await this.creaUserInviteHandler.executeAsync(args);
    if (!result.succeeded || !result.result) {
      throw new BadRequestException(result.message);
    }
    const obj = plainToInstance(CreateUserInviteResult, result.result);
    return obj;
  }
}
