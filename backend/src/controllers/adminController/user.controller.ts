import { Controller, Post, Body, BadRequestException, Get, Query } from '@nestjs/common';
import { ICreateUserInviteHandler } from '../../services/adminServices/officeServices/handlers/iCreateUserInviteHandler';
import {
  CreateUserInviteResult,
  CreateUserInviteArgs,
} from './user.dtos/createUserInvite.user.dto';
import { GetUsersResult, GetUsersArgs } from './user.dtos/getUsers.dto';
import { CurrentLoginResult } from './user.dtos/currentLogin.dto';
import { plainToInstance } from 'class-transformer';
import { IProfileHandler } from '../../services/adminServices/accountServices/handlers/iProfileHandler';
import { IGetUsersHandler } from '../../services/adminServices/officeServices/handlers/iGetUsersHandler';

@Controller('/admin/users')
export class UserController {
  constructor(
    private readonly creaUserInviteHandler: ICreateUserInviteHandler,
    private readonly profileHandler: IProfileHandler,
    private readonly getUsersHandler: IGetUsersHandler,
  ) {}

  @Get()
  async getUsers(@Query() args: GetUsersArgs): Promise<GetUsersResult> {
    args.currentPage = args.currentPage || 1;
    args.pageSize = args.pageSize || 10;

    const allowedSearch = {
      name: 'name',
    };
    const like: any = {};

    if (args.searchBy && allowedSearch[args.searchBy] && args.searchValue) {
      like[allowedSearch[args.searchBy]] = args.searchValue;
    }

    const getUsersResult = await this.getUsersHandler.executeAsync({
      includes: {
        areaOffice: args.includeOffice,
      },
      currentPage: args.currentPage,
      pageSize: args.pageSize,
      includePagination: true,
      like,
    });
    if (!getUsersResult.succeeded || !getUsersResult.result) {
      throw new BadRequestException(getUsersResult.message);
    }
    const obj = plainToInstance(GetUsersResult, getUsersResult.result, {
      excludeExtraneousValues: true,
    });
    return obj;
  }

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
